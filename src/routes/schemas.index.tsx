import { SchemasPage } from '@/features/schemas/pages/schemas-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/schemas/')({
  component: SchemasPage,
});
