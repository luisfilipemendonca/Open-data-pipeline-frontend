import { useId } from 'react';
import { Field, FieldLabel } from '../ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { SelectFieldProps } from './types';

export const SelectField = ({
  label,
  options,
  selectedValue,
  placeholder,
  onChange,
}: SelectFieldProps) => {
  const selectId = useId();

  return (
    <Field>
      <FieldLabel htmlFor={selectId}>{label}</FieldLabel>
      <Select
        id={selectId}
        value={selectedValue}
        onValueChange={(value) => onChange(value)}
        disabled={!options.length}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} align="end">
          {options.map((option) => (
            <SelectItem key={option.id} value={option.value}>
              {option.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
};
