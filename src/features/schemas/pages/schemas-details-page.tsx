import { AppBadge } from '@/components/app-badge';
import { AppBullet } from '@/components/app-bullet';
import { AppIconBadge } from '@/components/app-icon-badge';
import { Card } from '@/components/card';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { Separator } from '@/components/ui/separator';
import { Calendar, File, Layers } from 'lucide-react';

export const SchemasDetailsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Card className="flex gap-4">
        <div>
          <AppIconBadge size="xxl" className="rounded-sm">
            <File color="#fff" size={40} />
          </AppIconBadge>
        </div>
        <div className="flex flex-col gap-3 flex-4">
          <Heading>Customer Import</Heading>
          <Text>
            Schema for importing customer data from CSV files, including validation rules for
            required fields and data formats.
          </Text>
          <div className="flex gap-8">
            <Text className="flex items-center gap-2" size="small">
              <Calendar size={18} />
              Created on 12 Mar 2025
            </Text>
            <Text className="flex items-center gap-2" size="small">
              <Layers size={18} />
              Created on 12 Mar 2025
            </Text>
          </div>
        </div>
        <Separator orientation="vertical" className="mx-8" />
        <div className="flex-1 gap-4 flex flex-col justify-center">
          <AppBadge size="sm" className="gap-2">
            <AppBullet />
            Active
          </AppBadge>
          <dl>
            <dt>
              <Text as="span" size="small">
                Last updated
              </Text>
            </dt>
            <dd>
              <Text as="span" size="small" className="font-semibold">
                14 Nov 2025, 09:42
              </Text>
            </dd>
          </dl>
        </div>
      </Card>
    </div>
  );
};
