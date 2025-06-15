import {
  ActionIcon,
  Autocomplete,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { BaseFieldCard } from "src/05_shared/ui/base-field-card";
import classes from "./classes.module.css";
import { useState } from "react";
import { FieldType } from "src/05_shared/api/field/types";
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

interface EditableFieldProps {
  initialName: string;
  initialValue: string[];
  type: FieldType;
  options?: string[];
  fieldNames: string[];
  editable: boolean;
  handleChangeName: (name: string, index: number) => void;
  handleChangeValue(value: string | string[], index: number): void;
  handleDeleteField: (index: number) => void;

  handleChangeType: (type: FieldType, index: number) => void;

  index: number;
}
type ActiveInput = "name" | "value" | null;

export function EditableFieldV2({
  initialName,
  initialValue,
  type,
  options,
  fieldNames,
  editable,
  handleChangeName,
  handleChangeValue,
  handleDeleteField,
  handleChangeType,
  index,
}: EditableFieldProps) {
  const [opened, { toggle }] = useDisclosure(false);
  // const [activeInput, setActiveInput] = useState<ActiveInput>(null);

  // const nameInputClass = {
  //   root: `${classes.root} ${activeInput === "name" ? classes["root_active"] : ""}`,
  //   input: `${classes.input} ${activeInput !== "name" ? classes["input_inactive"] : ""}`,
  // };
  // const valueInputClass = {
  //   root: `${classes.root} ${activeInput === "value" ? classes["root_active"] : ""}`,
  //   input: `${classes.input} ${activeInput === "name" ? classes["input_inactive"] : ""}`,
  // };

  return (
    <BaseFieldCard
      inputs={
        <>
          <Autocomplete
            // classNames={nameInputClass}
            variant="unstyled"
            placeholder="Field name"
            disabled={!editable}
            data={fieldNames}
            value={initialName}
            onChange={(newName) => handleChangeName(newName, index)}
            // onFocus={() => setActiveInput("name")}
            // onBlur={() => setActiveInput(null)}
          />
          {opened && editable && (
            <Select
              data={[
                { value: "INPUT", label: "Input" },
                { value: "TEXTAREA", label: "TextArea" },
                { value: "SELECT", label: "Select" },
                { value: "MULTISELECT", label: "MultiSelect" },
              ]}
              variant="unstyled"
              value={type}
              w={"150"}
              onChange={(val) =>
                val && handleChangeType(val as FieldType, index)
              }
            />
          )}
          {type === "INPUT" && (
            <TextInput
              // classNames={valueInputClass}
              variant="unstyled"
              placeholder="Field value"
              disabled={!editable}
              value={initialValue[0]}
              onChange={(e) => handleChangeValue(e.target.value, index)}
              // onFocus={() => setActiveInput("value")}
              // onBlur={() => setActiveInput(null)}
            />
          )}
          {type === "TEXTAREA" && (
            <Textarea
              // classNames={valueInputClass}
              variant="unstyled"
              placeholder="Field value"
              disabled={!editable}
              value={initialValue[0]}
              onChange={(e) => handleChangeValue(e.target.value, index)}
              // onFocus={() => setActiveInput("value")}
              // onBlur={() => setActiveInput(null)}
            />
          )}
          {type === "SELECT" && (
            <Select
              data={options}
              variant="unstyled"
              placeholder="Field value"
              searchable
              disabled={!editable}
              value={initialValue[0]}
              onChange={(val) => val && handleChangeValue(val, index)}
            />
          )}
          {type === "MULTISELECT" && (
            <MultiSelect
              data={options}
              variant="unstyled"
              placeholder="Field value"
              searchable
              disabled={!editable}
              value={initialValue}
              onChange={(val) => handleChangeValue(val, index)}
            />
          )}
        </>
      }
      actions={
        <>
          {editable && (
            <>
              <ActionIcon onClick={toggle} size="lg">
                {opened ? <IconChevronUp /> : <IconChevronDown />}
              </ActionIcon>
              <ActionIcon
                size="lg"
                color="red"
                onClick={() => handleDeleteField(index)}
              >
                <IconTrash />
              </ActionIcon>
            </>
          )}
        </>
      }
      footer={<></>}
    />
  );
}
