import { FileUp, Upload } from 'lucide-react';
import { Field, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Text } from '../text';
import { useState, type ChangeEvent } from 'react';

export const UploadField = () => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const uploadedFiled = event.target.files[0];

    if (uploadedFiled.type !== 'text/csv') return;

    setFile(uploadedFiled);
  };

  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel className="w-full border border-dashed flex items-center justify-center flex-col p-8 gap-10 peer-focus-visible:ring-2 has-focus-visible:border-ring has-focus-visible:ring-2 has-focus-visible:ring-ring/50">
          <Upload className="size-12" />
          <div className="flex flex-col items-center gap-2">
            <Text as="span" weight="bold" size="large">
              Click to upload or drag and drop
            </Text>
            <Text as="span">CSV files only</Text>
          </div>
          <Input type="file" className="sr-only" onChange={handleInputChange} multiple={false} />
        </FieldLabel>
      </Field>
      {file && (
        <div className="border border-muted p-4 rounded-sm flex items-center gap-4">
          <span>
            <FileUp />
          </span>
          <div className="flex flex-col">
            <Text as="span">{file.name}</Text>
            <Text as="span" size="xsmall">
              {file.size}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};
