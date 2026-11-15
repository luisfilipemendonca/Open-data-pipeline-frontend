import { ImportDetailsPage } from '@/features/imports/pages/import-details-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/import/$importId')({
  component: ImportDetailsPage,
});
