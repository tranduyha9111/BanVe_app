import next from "next";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { LayoutDashboard, Settings, ChevronRight, Share2, ChevronsUpDown, PanelLeft, Sun, Moon, Info, } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
export default function Categories() {
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
                <CollapsibleContent className="CollapsibleContent">
                <SidebarMenuSub className="border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden">
                  <SidebarMenuSubItem className="group/menu-sub-item relative">
                  <SidebarMenuSubButton href="/admin/settings">
                  <span>Ho so</span>
                  </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className="group/menu-sub-item relative">
                  <SidebarMenuSubButton href="/admin/settings">
                  <span>Ho so</span>
                  </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
                </CollapsibleContent>
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
      </SidebarInset>
        </>
    )
}