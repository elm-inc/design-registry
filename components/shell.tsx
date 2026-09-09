// 画面の共通部品。shadcn primitives の上に **house の組み合わせ方**を薄く重ねる。
// 部品そのものは components/ui (shadcn) に置き、ここは組み合わせ方だけを持つ。
//
// 案件はこれをそのまま使い、**案件固有の意味づけ (ドメインの語彙) は
// 案件側のコンポーネントで包む**。ここにドメインを持ち込まない。
import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/**
 * 見出し付きのブロック。
 * CardHeader は grid レイアウトなので、flex を明示しないとタグが見出しの下に落ちる。
 */
export function Panel({
  title,
  tag,
  children,
  className,
}: {
  title?: string
  /** 見出し右端の補足 (件数・状態など) */
  tag?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <Card className={cn("gap-0 py-0", className)}>
      {title && (
        <CardHeader className="bg-muted/50 !flex items-center justify-between gap-2 rounded-t-xl border-b !px-3 !py-2">
          <CardTitle className="font-semibold">{title}</CardTitle>
          {tag && (
            <span className="text-muted-foreground text-small whitespace-nowrap">
              {tag}
            </span>
          )}
        </CardHeader>
      )}
      <CardContent className="px-3 py-2.5">{children}</CardContent>
    </Card>
  )
}

/** 単一の指標。数字は桁を揃える (縦に並べて比較するため)。 */
export function Stat({
  label,
  value,
  sub,
}: {
  label: string
  value: ReactNode
  sub?: ReactNode
}) {
  return (
    <Card className="gap-1 py-3">
      <CardContent className="px-3">
        <div className="text-muted-foreground text-small">{label}</div>
        <div className="text-xl font-semibold tabular-nums">{value}</div>
        {sub && <div className="text-muted-foreground text-small">{sub}</div>}
      </CardContent>
    </Card>
  )
}

/**
 * 量を示す横バー。
 * 可視化は chart トークンから着色する。**primary を使わない** —
 * house では primary を無彩色に寄せる案件が多く、量が読み取れなくなるため。
 */
export function Bar({ pct }: { pct: number }) {
  return (
    <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
      <div
        className="bg-chart-2 h-full rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  )
}

/**
 * 値が無いことを**空欄にしない**ための表示。
 *
 * 「無い」と「出さない」は別で、混同すると読み手が勝手に補完する
 * (空欄を 0 と読む)。理由を必ず添えることで、欠測の意味が伝わる。
 */
export function Empty({ reason }: { reason: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<span className="text-muted-foreground/60 cursor-help">—</span>}
      />
      <TooltipContent className="max-w-72">{reason}</TooltipContent>
    </Tooltip>
  )
}

/** ラベルと値の対。詳細画面の基本情報に使う。 */
export function Dl({
  rows,
  cols = 1,
}: {
  rows: [string, ReactNode][]
  /** 何列に並べるか。**項目が短いときだけ増やす** — 長い値を狭い列に
   *  押し込むと折り返しだらけになって読めなくなる */
  cols?: 1 | 2 | 3
}) {
  const grid = {
    1: "grid-cols-[8rem_1fr]",
    2: "grid-cols-[7rem_1fr] md:grid-cols-[7rem_1fr_7rem_1fr]",
    3: "grid-cols-[7rem_1fr] md:grid-cols-[7rem_1fr_7rem_1fr] lg:grid-cols-[7rem_1fr_7rem_1fr_7rem_1fr]",
  }[cols]
  return (
    <dl className={cn("grid gap-x-3 gap-y-0.5", grid)}>
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted-foreground">{k}</dt>
          <dd className="break-words">{v}</dd>
        </div>
      ))}
    </dl>
  )
}
