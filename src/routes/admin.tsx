import { createFileRoute, Outlet } from "@tanstack/react-router";
import { adminMiddleware } from "@/lib/adminMiddleware";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { Header } from "@/components/admin/header";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
} as any);

Route.options.server = { middleware: [adminMiddleware] };

function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex-1 bg-[#F4F4F5] p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
