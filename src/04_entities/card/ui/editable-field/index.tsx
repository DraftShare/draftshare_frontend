import {
  ActionIcon,
  Autocomplete,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { BaseFieldCard } from "src/05_shared/ui/base-field-card";
// import classes from "./classes.module.css";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";
import { field } from "src/05_shared/api/card/types";
import { FieldType } from "src/05_shared/api/field/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";
import { useMemo } from "react";

interface EditableFieldProps {
  field: field;
  editable: boolean;
  handleChangeName: (name: string, index: number) => void;
  handleChangeValue(value: string | string[], index: number): void;
  handleDeleteField: (index: number) => void;
  handleChangeType: (type: FieldType, index: number) => void;
  index: number;
}
// type ActiveInput = "name" | "value" | null;

export function EditableField({
  field,
  editable,
  handleChangeName,
  handleChangeValue,
  handleDeleteField,
  handleChangeType,
  index,
}: EditableFieldProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { data: fields } = useSuspenseQuery(getAllFields());
  const fieldNames = useMemo(() => fields.map((field) => field.name), [fields]);
  const { name, value, type, options } = field;
  // const [activeInput, setActiveInput] = useState<ActiveInput>(null);

  // const nameInputClass = {
  //   root: `${classes.root} ${activeInput === "name" ? classes["root_active"] : ""}`,
  //   input: `${classes.input} ${activeInput !== "name" ? classes["input_inactive"] : ""}`,
  // };
  // const valueInputClass = {
  //   root: `${classes.root} ${activeInput === "value" ? classes["root_active"] : ""}`,
  //   input: `${classes.input} ${activeInput === "name" ? classes["input_inactive"] : ""}`,
  // };

  const isFieldExists = fieldNames.includes(name);

  return (
    <BaseFieldCard
      inputs={
        <>
          <div>
            <Autocomplete
              // classNames={nameInputClass}
              variant="unstyled"
              placeholder="Field name"
              disabled={!editable}
              data={fieldNames}
              value={name}
              onChange={(newName) => handleChangeName(newName, index)}
              // onFocus={() => setActiveInput("name")}
              // onBlur={() => setActiveInput(null)}
            />
            {!isFieldExists &&
              (type === "SELECT" || type === "MULTISELECT") && (
                <span>alert</span>
              )}
          </div>

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
              value={value[0]}
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
              value={value[0]}
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
              value={value[0]}
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
              value={value}
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
