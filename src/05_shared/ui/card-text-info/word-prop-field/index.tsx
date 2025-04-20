import { ActionIcon, Autocomplete, Box, Fieldset } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { FieldName } from "src/05_shared/api/field/types";
import { PropField } from "src/05_shared/lib/useDynamicProps";
import classes from "./classes.module.css";

type ActiveField = "name" | "value" | null;

export function WordPropField({
  inputValue,
  index,
  handleChangeField,
  handleDeleteProp,
  editable,
  // display,
  fieldNames,
}: {
  inputValue: [string, string];
  index: number;
  handleChangeField: (
    // e: React.ChangeEvent<HTMLInputElement>,
    value: string,
    index: number,
    field: PropField
  ) => void;
  handleDeleteProp?: (index: number) => void;
  editable: boolean;
  // display?: "name" | "value";
  fieldNames: FieldName[];
}) {
  const [activeField, setActiveField] = useState<ActiveField>(null);

  const nameField = (
    <FieldInput
      key={index + "name"}
      activeField={activeField}
      setActiveField={setActiveField}
      inputValue={inputValue[0]}
      field="name"
      handleChangeProp={handleChangeField}
      index={index}
      editable={editable}
      fieldNames={fieldNames}
    />
  );
  const valueField = (
    <FieldInput
      key={index + "value"}
      activeField={activeField}
      setActiveField={setActiveField}
      inputValue={inputValue[1]}
      field="value"
      handleChangeProp={handleChangeField}
      index={index}
      editable={editable}
      fieldNames={fieldNames}
    />
  );

  return (
    <Fieldset variant="unstyled" className={classes["fieldset-n"]}>
      <Box className={classes["add-prpoerty-input__wrap-n"]}>
        {/* {display === "name"
          ? nameField
          : display === "value"
            ? valueField
            : [nameField, valueField]} */}
            {[nameField, valueField]}
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
  fieldNames,
  // readOnly,
  // placeholder
}: {
  activeField: ActiveField;
  setActiveField: React.Dispatch<React.SetStateAction<ActiveField>>;
  inputValue: string;
  field: "name" | "value";
  handleChangeProp: (
    // e: React.ChangeEvent<HTMLInputElement>,
    value: string,
    index: number,
    field: PropField
  ) => void;
  index: number;
  editable: boolean;
  fieldNames: FieldName[];

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
    <Autocomplete
      classNames={inputStyle}
      variant="unstyled"
      placeholder={placeholder}
      value={inputValue}
      onChange={(val) => handleChangeProp(val, index, field)}
      onFocus={() => setActiveField(field)}
      onBlur={() => setActiveField(null)}
      disabled={!editable}
      data={field === "name" ? fieldNames : []}
      // rightSection={editable && readOnlyProp && <IconLock />}
      // required={inputProp === "word"}
    />
  );
}
