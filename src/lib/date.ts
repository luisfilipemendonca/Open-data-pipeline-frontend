const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'short',
  timeStyle: 'short',
});

const importDateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const importDateTimeFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const formatDateTime = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '';

  return dateTimeFormatter.format(date);
};

export const importFormatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '';

  return importDateFormatter.format(date);
};

export const importFormatDateTime = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '';

  return importDateTimeFormatter.format(date);
};
