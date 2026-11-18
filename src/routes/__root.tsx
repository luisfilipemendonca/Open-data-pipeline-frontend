import { AppSidebar } from '@/components/app-sidebar';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="bg-linear-to-b from-slate-100/50 to-slate-0 min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 py-4 px-6">
        <Outlet />
      </div>
    </div>
  ),
});
