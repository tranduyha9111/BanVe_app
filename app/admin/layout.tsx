import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Admin  from "../admin/components/Admin"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <div className="@container/content flex min-h-svh w-full">
      <Admin />
      <main data-layout="auto"
          className="
            flex-1
            px-4 py-6
            overflow-auto
            @7xl/content:mx-auto
            @7xl/content:w-full
            @7xl/content:max-w-[1500px]
          ">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
      </div>
    </SidebarProvider>
  )
}