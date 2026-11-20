import { ImportsPage } from '@/features/imports/pages/imports-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/imports/')({
  component: ImportsPage,
});
