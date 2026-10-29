export type SelectOption = {
  id: string | number;
  value: string;
  label: string;
};

export type SelectFieldProps = {
  selectedValue?: string;
  options: SelectOption[];
  onChange: (value: string | null) => void;
};
