# elm design-registry

elm の **UI デザインレギュレーションの単一ソース**。[shadcn custom registry](https://ui.shadcn.com/docs/registry) として design tokens を JSON over HTTP で配布し、各案件はこれを取り込んで**差分だけ**を重ねる。

- 方針 (なぜ専用リポか): [agent-rules ADR-0014](https://github.com/elm-inc/agent-rules/blob/main/docs/adr/0014-shadcn-design-registry.md)
- 使い方全体: [agent-rules docs/setup/shadcn.md](https://github.com/elm-inc/agent-rules/blob/main/docs/setup/shadcn.md)
- 配信 URL (GitHub Pages): `https://elm-inc.github.io/design-registry/r/{name}.json`

> ⚠️ **現状 base は neutral の骨格値**。本番のブランドトークンは `/design-voice` で抽出して差し替える (下記「house-style の作り込み」)。

## 構成

```
design-registry/
├─ registry.json                    # 単一ソース: items[base, theme-*] を cssVars で定義
├─ themes/                          # ブランド/案件差分 (theme preset) の受け皿
├─ components/                      # house-style 済みコンポーネント (任意・将来)
└─ .github/workflows/
   ├─ pages.yml                     # main push → shadcn build → public/r/ を Pages 配信
   └─ registry-ci.yml              # PR: registry.json 検証 + shadcn build
```

`public/r/*.json` は `shadcn build` の生成物で **CI で生成して配信** (コミットしない・gitignore)。

## registry items

| item | type | 役割 |
|---|---|---|
| `base` | `registry:theme` (`extends: "none"`) | 定常レギュレーション。OKLCH の CSS 変数 (light/dark) + radius。**これがレギュレーション本体** |
| `theme-example` | `registry:theme` | 案件差分 (accent 色等) を base の上に重ねる preset の雛形 |

## 案件側の使い方 (差分だけ)

```jsonc
// 案件の components.json (public なので認証不要)
{
  "registries": {
    "@elm": "https://elm-inc.github.io/design-registry/r/{name}.json"
  }
}
```

```bash
pnpm dlx shadcn@latest add @elm/base            # 定常レギュレーションを必ず取り込む
pnpm dlx shadcn@latest add @elm/theme-<brand>   # 案件のブランド差分だけを重ねる
```

## 「必ず反映」を CI で保証 (drift 検査)

案件リポの CI に、base が最新か検査するステップを入れる:

```yaml
- name: design-registry drift check
  run: |
    pnpm dlx shadcn@latest add @elm/base --diff | tee /tmp/diff
    test ! -s /tmp/diff   # 差分があれば fail (base 未反映)
```

> `--diff` の正確な出力仕様・exit code は shadcn の版依存。運用前に実挙動で確認してしきい値を決める。

## house-style の作り込み (`/design-voice`)

base の色・書体・radius は `/design-voice extract <参照>` で抽出した個性から確定する。

1. 参照例 (既存サイト URL / スクショ / 言葉のブリーフ) から `/design-voice extract` で `tokens.json` を得る
2. 抽出値で `registry.json` の `base.cssVars` を更新 (色・radius)。フォント等は将来 `theme` キー or 追加 item に
3. ブランド変種は `theme-*` preset として追加し、案件は base + preset を重ねる

## ローカルで build を確認

```bash
pnpm dlx shadcn@latest build      # → public/r/base.json, theme-example.json, registry.json
```
