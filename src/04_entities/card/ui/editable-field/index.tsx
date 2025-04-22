import { Autocomplete, ActionIcon, TextInput, Fieldset } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { memo, useState } from "react";
import { ListItemEntities } from "../../../../05_shared/ui/list-entities/list-item";
import classes from "./classes.module.css";

interface EditableFieldProps {
  initialName: string;
  initialValue: string;
  fieldNames: string[];
  editable: boolean;
  onUpdate: (index: number, name: string, value: string) => void;
  onDelete?: (index: number) => void;
  index: number;
}
type ActiveInput = "name" | "value" | null;

export const EditableField = memo(function EditableField({
  initialName,
  initialValue,
  fieldNames,
  editable,
  onUpdate,
  onDelete,
  index,
}: EditableFieldProps) {
  const [activeInput, setActiveInput] = useState<ActiveInput>(null);

  const nameInputClass = {
    root: `${classes.root} ${activeInput === "name" ? classes["root_active"] : ""}`,
    input: `${classes.input} ${activeInput !== "name" ? classes["input_inactive"] : ""}`,
  };
  const valueInputClass = {
    root: `${classes.root} ${activeInput === "value" ? classes["root_active"] : ""}`,
    input: `${classes.input} ${activeInput === "name" ? classes["input_inactive"] : ""}`,
  };

  return (
    <ListItemEntities>
      <Fieldset variant="unstyled" className={classes["fieldset"]}>
        <div className={classes["input-wrap"]}>
          <Autocomplete
            classNames={nameInputClass}
            variant="unstyled"
            placeholder="Field name"
            disabled={!editable}
            data={fieldNames}
            value={initialName}
            onChange={(newName) => onUpdate(index, newName, initialValue)}
            onFocus={() => setActiveInput("name")}
            onBlur={() => setActiveInput(null)}
          />
          <TextInput
            classNames={valueInputClass}
            variant="unstyled"
            placeholder="Field value"
            disabled={!editable}
            value={initialValue}
            onChange={(e) => onUpdate(index, initialName, e.target.value)}
            onFocus={() => setActiveInput("value")}
            onBlur={() => setActiveInput(null)}
          />
        </div>
        {editable && onDelete && (
          <ActionIcon onClick={() => onDelete(index)} size="lg">
            <IconTrash />
          </ActionIcon>
        )}
      </Fieldset>
    </ListItemEntities>
  );
});
