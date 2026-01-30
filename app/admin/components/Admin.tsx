"use client";
import { Avatar } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {Separator} from "@/components/ui/separator"
import { AvatarImage } from "@radix-ui/react-avatar";
import { LayoutDashboard, Settings, ChevronRight, Share2, ChevronsUpDown, PanelLeft, Sun, Moon, Info, } from "lucide-react";
import next from "next";
import Link from "next/link";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup , ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
const data = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 200 },
  { name: "Wed", value: 150 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 170 },
];
const chartData = [
  { name: "T1", value: 400 },
  { name: "T2", value: 300 },
  { name: "T3", value: 600 },
  // ... thêm data cho 3 tháng
];
export default function Admin() {
  return (
    <>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="flex flex-col gap-2 p-2">
          {/* <span className="font-semibold">Admin</span> */}
        </SidebarHeader>
        <SidebarContent className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden">
          <SidebarGroup className="relative flex w-full min-w-0 flex-col p-2">
            <SidebarGroupLabel className="text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0">
              Tổng quan
            </SidebarGroupLabel>
            <SidebarMenu className="flex w-full min-w-0 flex-col gap-1">
              <SidebarMenuItem className="group/menu-item relative">
                <SidebarMenuButton
                  className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                  asChild
                >
                  <Link href="/admin">
                    <LayoutDashboard className="lucide lucide-layout-dashboard" />
                    <span> Thống kê</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="group/menu-item relative">
                <SidebarMenuButton
                  className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                  asChild
                >
                  <Link href="/admin">
                    <LayoutDashboard className="lucide lucide-layout-dashboard" />
                    <span> Thống kê</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="group/menu-item relative">
                <SidebarMenuButton
                  className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                  asChild
                >
                  <Link href="/admin">
                    <LayoutDashboard className="lucide lucide-layout-dashboard" />
                    <span> Thống kê</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="group/menu-item relative">
                <SidebarMenuButton
                  className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                  asChild
                >
                  <Link href="/admin">
                    <LayoutDashboard className="lucide lucide-layout-dashboard" />
                    <span> Thống kê</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="group/menu-item relative">
                <SidebarMenuButton
                  className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                  asChild
                >
                  <Link href="/admin">
                    <LayoutDashboard className="lucide lucide-layout-dashboard" />
                    <span> Thống kê</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="group/menu-item relative">
                <SidebarMenuButton
                  className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                  asChild
                >
                  <Link href="/admin">
                    <LayoutDashboard className="lucide lucide-layout-dashboard" />
                    <span> Thống kê</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="group/menu-item relative">
                <SidebarMenuButton
                  className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                  asChild
                >
                  <Link href="/admin">
                    <LayoutDashboard className="lucide lucide-layout-dashboard" />
                    <span> Thống kê</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="relative flex w-full min-w-0 flex-col p-2">
            <SidebarGroupLabel className="text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0">
              Khác
            </SidebarGroupLabel>
            <SidebarMenu className="flex w-full min-w-0 flex-col gap-1">
              <SidebarMenuItem className="group/menu-item relative group/collapsible">
                <SidebarMenuButton className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm">
                  <Settings className="lucide lucide-settings" />
                  <span>Cài đặt</span>
                  <ChevronRight className="lucide lucide-chevron-right ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="group/menu-item relative">
                <SidebarMenuButton className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm">
                  <Share2 className="lucide lucide-share2 lucide-share-2" />
                  <span>Mạng xã hội</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2 p-2">
          <SidebarMenu className="flex w-full min-w-0 flex-col gap-1">
            <SidebarMenuItem className="group/menu-item relative">
              <SidebarMenuButton className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 py-3 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding,color,background] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-12 text-sm group-data-[collapsible=icon]:p-0! hover:bg-primary/20 hover:text-primary">
                <Avatar className="relative flex size-8 shrink-0 overflow-hidden h-8 w-8 rounded-lg">
                  <AvatarImage
                    className="aspect-square size-full"
                    alt="Admin System"
                    src="https://giangvien.org/gateway/ban-ve//uploads/file-1769410620682-77102890.jpg"
                  />
                </Avatar>
                <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-semibold">Admin System</span>
                    <span className="truncate text-xs"> admin@gmail.com</span>
                </div>
                <ChevronsUpDown className="lucide lucide-chevrons-up-down ms-auto size-4"/>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail className="hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2"></SidebarRail>
      </Sidebar>
      <SidebarInset className="bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 @container/content has-data-[layout=fixed]:h-svh peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]">
      <header className="z-50 h-16 shadow-none">
        <div className="relative flex h-full items-center justify-between gap-3 p-4 sm:gap-4">
          <div>
            <SidebarTrigger className="cursor-pointer inline-flex items-center shadow-none! justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-primary hover:text-primary-foreground size-7 max-md:scale-125">
              <PanelLeft className="lucide lucide-panel-left"/>
              <span className="sr-only"> Toggle Sidebar</span>
            </SidebarTrigger>
            <Separator orientation="vertical" className="h-6 mx-2" />
          </div>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer inline-flex items-center shadow-none! justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-primary hover:bg-primary/10 h-9 w-9 rounded-full">
            <Settings className="lucide lucide-settings"/>
            </button>
            <button className="cursor-pointer inline-flex items-center shadow-none! justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/10 h-9 w-9 hover:text-primary/80 scale-95 rounded-full">
            <Sun className="lucide lucide-sun size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
            <Moon className="lucide lucide-moon absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
            <span className="sr-only">Toggle theme</span>
            </button>
            <button className="cursor-pointer inline-flex items-center shadow-none! justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/10 px-4 py-2 hover:text-primary/80 relative h-8 w-8 rounded-full">
            <Avatar className="relative flex size-8 shrink-0 overflow-hidden h-8 w-8 rounded-lg">
              <AvatarImage className="aspect-square size-full" src="https://giangvien.org/gateway/ban-ve//uploads/file-1769410620682-77102890.jpg" alt="@shadcn" />
            </Avatar>
            </button>
            </div> 
        </div>
      </header>
        <main data-layout="auto"
          className="
            flex-1
            px-4 py-6
            overflow-auto
            @7xl/content:mx-auto
            @7xl/content:w-full
            @7xl/content:max-w-[1500px]
          ">
          <div className="space-y-8">
            <div className="flex items-center gap-8">
              <Card className="text-card-foreground flex flex-col gap-6 rounded-none py-6 shadow-none flex-1 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">Tổng Người Dùng
                    <Info className="lucide lucide-info h-4 w-4 text-gray-400"/>
                  </CardTitle>
                  
                </CardHeader>
                <CardContent className="px-6 space-y-3">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    4,682 </div>
                    <div className="h-8 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                        <Line dataKey="value" />
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Kể từ tuần trước
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Chi tiết :</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                      +15.54%
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="text-card-foreground flex flex-col gap-6 rounded-none py-6 shadow-none flex-1 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tổng Nội Dung
                      <Info  className="lucide lucide-info h-4 w-4 text-gray-400"/>
                </CardTitle>

                </CardHeader>
                <CardContent className="px-6 space-y-3">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  1,226
                  </div>
                  <div className="h-8 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                        <Line dataKey="value" />
                        </LineChart>
                        </ResponsiveContainer>
                    </div> 
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Kể từ tuần trước</div>

                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400" >Chi tiết :</span>
                      <span className="flex items-center gap-1 text-sm font-medium text-red-600 dark:text-red-400">
                        -40.2%
                      </span>
                    </div>

                </CardContent>
              </Card>
              <Card className="text-card-foreground flex flex-col gap-6 rounded-none py-6 shadow-none flex-1 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tổng Cộng Tác Viên
                      <Info  className="lucide lucide-info h-4 w-4 text-gray-400"/>
                </CardTitle>
                </CardHeader>
                <CardContent className="px-6 space-y-3">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">1,080</div>
                  <div className="h-8 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                        <Line dataKey="value" />
                        </LineChart>
                        </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Kể từ tuần trước </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Chi tiết :</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                      +10.8%
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="text-card-foreground flex flex-col gap-6 rounded-none py-6 shadow-none flex-1 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tổng Bình Luận
                  <Info  className="lucide lucide-info h-4 w-4 text-gray-400"/>
                </CardTitle>
                </CardHeader>
                <CardContent className="px-6 space-y-3">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">12,543</div>
                  <div className="h-8 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                        <Line dataKey="value" />
                        </LineChart>
                        </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Kể từ tuần trước</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Chi tiết :
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                      +12.3%
                    </span>
                  </div>
                </CardContent>
              </Card>

            </div>
            <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-none border py-6 shadow-none @container/card h-[500px]">
            <CardHeader className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
            <CardTitle className="leading-none font-semibold">
              <CardDescription className="text-muted-foreground text-sm">
                <span className="hidden @[540px]/card:block">Thống kê 3 tháng trước</span>
                {/* <span className="@[540px]/card:hidden">3 tháng trước</span> */}
              </CardDescription>
              <CardAction className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
                <ToggleGroup type="single" className="group/toggle-group w-fit items-center rounded-md data-[variant=outline]:shadow-xs hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex">
                <ToggleGroupItem value="3 months" className="inline-flex items-center justify-center gap-2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-9 px-2 min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l">3 tháng trước</ToggleGroupItem>
                <ToggleGroupItem value="30 days" className="inline-flex items-center justify-center gap-2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-9 px-2 min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l">30 ngày trước</ToggleGroupItem>
                <ToggleGroupItem value="7 days" className="inline-flex items-center justify-center gap-2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-9 px-2 min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l">7 ngày trước</ToggleGroupItem>
                </ToggleGroup>
              </CardAction>
            </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <ChartContainer
      config={{
        value: {
          label: "Users",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />

          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
            </CardContent>
            </Card>
          </div>
          </main>
      </SidebarInset>
    </>
  );
}

