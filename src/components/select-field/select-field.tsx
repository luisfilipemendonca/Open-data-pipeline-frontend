import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { SelectFieldProps } from './types';

export const SelectField = ({ options, selectedValue, onChange }: SelectFieldProps) => {
  return (
    <Select value={selectedValue} onValueChange={(value) => onChange(value)}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="end">
        {options.map((option) => (
          <SelectItem key={option.id} value={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
