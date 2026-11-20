import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/schemas')({
  component: () => <Outlet />,
});
