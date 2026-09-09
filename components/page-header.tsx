// 画面見出し (eyebrow / 見出し / 説明 / 操作)。
// 案件をまたいで**同じ読み方**になるように、順序と役割を固定する。
//
// **サイズは指定しない**。`<h1>` は @elm/base の要素既定 (--text-h1)、説明は
// `text-small`。px を撒くと density preset (@elm/theme-dense) が効かなくなる。
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  /** 上位ページなどの前置き。**サービス名は入れない** — ヘッダーに出ており、
   *  同じ語が 2 か所に出ると読み手がどちらを見ればよいか分からなくなる */
  eyebrow?: ReactNode
  title: string
  description?: string
  /** 右側に置く操作 (絞り込みの解除・更新など) */
  actions?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mb-3 flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-muted-foreground text-small font-semibold tracking-wider">
            {eyebrow}
          </div>
        )}
        <h1 className="truncate font-semibold text-balance">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-0.5 text-small">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  )
}
