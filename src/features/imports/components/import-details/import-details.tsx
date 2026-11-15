import { Card } from '@/components/card';
import { Text } from '@/components/text';
import { CircleCheck, CircleX, ChartNoAxesColumn, Calendar, File, Layers } from 'lucide-react';
import { RowDetailsCard } from './rows-details-card';
import { useGetImportDetails } from '../../hooks/use-get-import-details';
import { Heading } from '@/components/heading';
import { AppBadge } from '@/components/app-badge';
import { AppBullet } from '@/components/app-bullet';
import { importFormatDate, importFormatDateTime } from '@/lib/date';
import { AppIconBadge } from '@/components/app-icon-badge';
import { AppButton } from '@/components/app-button';
import type { ImportDetailsProps } from './types';

export const ImportDetails = ({ importId }: ImportDetailsProps) => {
  const { data: importDetails } = useGetImportDetails(importId);

  if (!importDetails?.data) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Heading>Import #{importDetails.data.importId}</Heading>
            <AppBadge size="sm" className="flex gap-2">
              <AppBullet />
              {importDetails.data.status}
            </AppBadge>
          </div>
          <Text>Import started on {importFormatDate(importDetails.data.createdAt)}</Text>
        </div>
        <div className="flex gap-3">
          <AppButton variant="outline">Download</AppButton>
          <AppButton variant="destructive">Delete</AppButton>
        </div>
      </div>
      <div className="mb-4">
        <Card className="flex h-34 gap-4">
          <div className="flex-1 flex gap-4">
            <AppIconBadge className="top-1 relative">
              <File color="#fff" />
            </AppIconBadge>
            <dl>
              <div>
                <dt>
                  <Text as="span" size="small">
                    File name:
                  </Text>
                </dt>
                <dd>
                  <Text as="span" size="base" className="font-semibold">
                    {importDetails.data.fileName}
                  </Text>
                </dd>
              </div>
            </dl>
          </div>
          <div className="w-0.5 h-full bg-accent"></div>
          <div className="flex gap-4 flex-1 ">
            <AppIconBadge className="top-1 relative">
              <Calendar color="#fff" />
            </AppIconBadge>
            <dl className="flex flex-col gap-2">
              <div>
                <dt>
                  <Text as="span" size="small">
                    Started at:
                  </Text>
                </dt>
                <dd>
                  <Text as="span" size="base" className="font-semibold">
                    {importFormatDateTime(importDetails.data.createdAt)}
                  </Text>
                </dd>
              </div>
              <div>
                <dt>
                  <Text as="span" size="small">
                    Updated at:
                  </Text>
                </dt>
                <dd>
                  <Text as="span" size="base" className="font-semibold">
                    {importFormatDateTime(importDetails.data.updatedAt)}
                  </Text>
                </dd>
              </div>
            </dl>
          </div>

          <div className="w-0.5 h-full bg-accent"></div>

          <div className="flex-1 flex gap-4">
            <AppIconBadge className="top-1 relative">
              <Layers color="#fff" />
            </AppIconBadge>
            <dl>
              <div>
                <dt>
                  <Text as="span" size="small">
                    Schema:
                  </Text>
                </dt>
                <dd>
                  <Text as="span" size="base" className="font-semibold">
                    {importDetails.data.schemaName ?? 'Untitled schema'}
                  </Text>
                </dd>
              </div>
            </dl>
          </div>
        </Card>
      </div>
      <div className="flex gap-4">
        <RowDetailsCard
          cardVariant="success"
          icon={CircleCheck}
          label="Valid records"
          value={importDetails.data.summary.totalValidRows}
          iconBadgeVariant="success"
        />
        <RowDetailsCard
          cardVariant="danger"
          icon={CircleX}
          label="Records with errors"
          value={importDetails.data.summary.totalInvalidRows}
          iconBadgeVariant="danger"
        />
        <RowDetailsCard
          icon={ChartNoAxesColumn}
          label="Total records"
          value={importDetails.data.summary.totalRows}
        />
      </div>
    </div>
  );
};
