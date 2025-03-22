import { ActionIcon, Box, Fieldset, TextInput } from "@mantine/core";
import { IconLock, IconTrash } from "@tabler/icons-react";
import classes from "./classes.module.css";
import { useState } from "react";
import { PropField } from "src/05_shared/lib/useDynamicProps";

type ActiveField = "name" | "value" | null;

export function WordPropField({
  inputValue,
  index,
  handleChangeProp,
  handleDeleteProp,
  editable,
  display,
}: {
  inputValue: [string, string];
  index: number;
  handleChangeProp: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: PropField
  ) => void;
  handleDeleteProp?: (index: number) => void;
  editable: boolean;
  display?: "name" | "value";
}) {
  const [activeField, setActiveField] = useState<ActiveField>(null);

  const nameField = (
    <FieldInput
      activeField={activeField}
      setActiveField={setActiveField}
      inputValue={inputValue[0]}
      field="name"
      handleChangeProp={handleChangeProp}
      index={index}
      editable={editable}
    />
  );
  const valueField = (
    <FieldInput
      activeField={activeField}
      setActiveField={setActiveField}
      inputValue={inputValue[1]}
      field="value"
      handleChangeProp={handleChangeProp}
      index={index}
      editable={editable}
    />
  );

  return (
    <Fieldset variant="unstyled" className={classes["fieldset-n"]}>
      <Box className={classes["add-prpoerty-input__wrap-n"]}>
        {display === "name"
          ? nameField
          : display === "value"
            ? valueField
            : [nameField, valueField]}
      </Box>

      {editable && index !== undefined && handleDeleteProp && (
        <ActionIcon
          type="button"
          onClick={() => handleDeleteProp(index)}
          size="lg"
        >
          <IconTrash />
        </ActionIcon>
      )}
    </Fieldset>
  );
}

function FieldInput({
  activeField,
  setActiveField,
  inputValue,
  field,
  handleChangeProp,
  index,
  editable,
  // readOnly,
  // placeholder
}: {
  activeField: ActiveField;
  setActiveField: React.Dispatch<React.SetStateAction<ActiveField>>;
  inputValue: string;
  field: "name" | "value";
  handleChangeProp: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: PropField
  ) => void;
  index: number;
  editable: boolean;
  // readOnly: boolean;
  // placeholder: string
}) {
  const inputStyle =
    field === "name"
      ? {
          root: `${classes.root} ${activeField === "name" ? classes["root_active"] : ""}`,
          input: `${classes.input} ${activeField !== "name" ? classes["input_inactive"] : ""}`,
        }
      : field === "value"
        ? {
            root: `${classes.root} ${activeField === "value" ? classes["root_active"] : ""}`,
            input: `${classes.input} ${activeField === "name" ? classes["input_inactive"] : ""}`,
          }
        : {};
  const placeholder =
    field === "name"
      ? "property name"
      : field === "value"
        ? "property value"
        : "";

  return (
    <TextInput
      classNames={inputStyle}
      variant="unstyled"
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => handleChangeProp(e, index, field)}
      onFocus={() => setActiveField(field)}
      onBlur={() => setActiveField(null)}
      disabled={!editable}
      // rightSection={editable && readOnlyProp && <IconLock />}
      // required={inputProp === "word"}
    />
  );
}
