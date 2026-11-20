import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/schemas/$schemaId')({
  component: () => <div>Hello world</div>,
});
