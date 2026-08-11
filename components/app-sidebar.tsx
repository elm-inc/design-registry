"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// elm house 標準サイドバー骨格 (@elm/app-shell)。
// 案件はナビ項目・ヘッダー(ロゴ/ワークスペース)・フッター(ユーザー)だけ差し替える。
// 構造 (Header / Content(Group) / Footer / Rail) と collapsible=icon は house 規約として固定。
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* 案件: ロゴ / ワークスペース切替をここに */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>メニュー</SidebarGroupLabel>
          <SidebarMenu>
            {/* 案件: ナビ項目に差し替え (下は例) */}
            <SidebarMenuItem>
              <SidebarMenuButton isActive>ホーム</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>設定</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* 案件: ユーザーメニュー / サインアウトをここに */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
