import { Card } from '@/components/card';
import { Text } from '@/components/text';
import type { RowDetailsCardProps } from './types';

export const RowDetailsCard = ({ icon: Icon, label, value, cardVariant }: RowDetailsCardProps) => {
  return (
    <Card className="flex flex-1 gap-8 items-center" variant={cardVariant}>
      <span>
        <Icon />
      </span>
      <Text className="flex flex-col">
        <Text as="span" size="small">
          {label}
        </Text>
        <Text as="span" size="large">
          {value}
        </Text>
      </Text>
    </Card>
  );
};
