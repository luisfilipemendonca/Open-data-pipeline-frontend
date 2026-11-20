import { SchemasDetailsPage } from '@/features/schemas/pages/schemas-details-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/schemas/$schemaId')({
  component: SchemasDetailsPage,
});
