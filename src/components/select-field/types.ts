export type SelectOption = {
  id: string | number;
  value: string;
  label: string;
};

export type SelectFieldProps = {
  label: string;
  selectedValue?: string;
  placeholder?: string;
  options: SelectOption[];
  onChange: (value: string | null) => void;
};
