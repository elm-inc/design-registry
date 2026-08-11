"use client"

import * as React from "react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"

// elm house 標準レイアウト骨格 (@elm/app-shell)。Next.js App Router 想定。
// sidebar + header + content の構成・寸法・余白は @elm/base のトークンで固定する。
// - sidebar 幅: base の --app-sidebar-width / --app-sidebar-width-icon を provider に流し込む
//   (shadcn の SidebarProvider は同名 --sidebar-width をインライン上書きするため別名トークンから供給)
// - content: 最大幅 --page-max、左右 --gutter、縦 --section-gap
// 案件は header に渡す内容と AppSidebar のナビ項目だけを差し替える (骨格は共通)。
export function AppShell({
  children,
  header,
}: {
  children: React.ReactNode
  /** header バー右側に置く案件固有の要素 (パンくず・アクション等) */
  header?: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "var(--app-sidebar-width)",
          "--sidebar-width-icon": "var(--app-sidebar-width-icon)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-[var(--gutter)]">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {header}
        </header>
        <main className="mx-auto w-full max-w-[var(--page-max)] flex-1 px-[var(--gutter)] py-[var(--section-gap)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
