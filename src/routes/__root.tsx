import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="py-4 px-8 bg-linear-to-b from-slate-100/50 to-slate-0 min-h-screen">
      <Outlet />
    </div>
  ),
});
