import { Autocomplete, ActionIcon, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { memo, useState } from "react";

interface EditableFieldProps {
  initialName: string;
  initialValue: string;
  fieldNames: string[];
  editable: boolean;
  onUpdate: (index: number, name: string, value: string) => void;
  onDelete?: (index: number) => void;
  index: number;
}

export const EditableField = memo(function EditableField({
  initialName,
  initialValue,
  fieldNames,
  editable,
  onUpdate,
  onDelete,
  index,
}: EditableFieldProps) {
  const [name, setName] = useState(initialName);
  const [value, setValue] = useState(initialValue);

  const handleNameChange = (newName: string) => {
    setName(newName);
    onUpdate(index, newName, value);
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onUpdate(index, name, newValue);
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Autocomplete
        value={name}
        onChange={handleNameChange}
        data={fieldNames}
        placeholder="Property name"
        disabled={!editable}
      />
      <TextInput
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        placeholder="Property value"
        disabled={!editable}
      />
      {editable && onDelete && (
        <ActionIcon onClick={() => onDelete(index)} size="lg">
          <IconTrash />
        </ActionIcon>
      )}
    </div>
  );
});
