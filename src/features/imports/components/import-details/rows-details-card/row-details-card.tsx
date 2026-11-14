import { Card } from '@/components/card';
import { Text } from '@/components/text';
import type { RowDetailsCardProps } from './types';
import { AppIconBadge } from '@/components/app-icon-badge';

export const RowDetailsCard = ({
  icon: Icon,
  label,
  value,
  cardVariant,
  iconBadgeVariant,
}: RowDetailsCardProps) => {
  return (
    <Card className="flex flex-1 gap-8 items-center" variant={cardVariant}>
      <AppIconBadge variant={iconBadgeVariant}>
        <Icon color="#fff" />
      </AppIconBadge>
      <Text className="flex flex-col">
        <Text as="span" size="small">
          {label}
        </Text>
        <Text as="span" size="base" className="font-bold border-">
          {value}
        </Text>
      </Text>
    </Card>
  );
};
