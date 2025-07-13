import {
  ActionIcon,
  Autocomplete,
  Box,
  ComboboxStringItem,
  Menu,
  MultiSelect,
  Textarea,
  TextInput,
} from "@mantine/core";
import { BaseFieldCard } from "src/05_shared/ui/base-field-card";
// import classes from "./classes.module.css";
import {
  IconAlertSquareRounded,
  IconLetterISmall,
  IconLetterMSmall,
  IconLetterSSmall,
  IconLetterTSmall,
  IconSquareLetterM,
  IconSquareLetterS,
  IconSquareLetterT,
  IconTrash,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { field } from "src/05_shared/api/card/types";
import { Field, FieldType } from "src/05_shared/api/field/types";

interface EditableFieldProps {
  field: field;
  editable: boolean;
  handleChangeName: (name: string, index: number) => void;
  handleChangeValue(value: string | string[], index: number): void;
  handleDeleteField: (index: number) => void;
  handleChangeType: (type: FieldType, index: number) => void;
  handleChangeOptions: (options: string[], index: number) => void;
  index: number;
  isValid: boolean;
  allFields: Field[];
}
// type ActiveInput = "name" | "value" | null;

export function EditableField({
  field,
  editable,
  handleChangeName,
  handleChangeValue,
  handleDeleteField,
  handleChangeType,
  handleChangeOptions,
  index,
  isValid,
  allFields: fields,
}: EditableFieldProps) {
  // const [opened, { toggle }] = useDisclosure(false);
  // const { data: fields } = useSuspenseQuery(getAllFields());
  // const fieldNames = useMemo(() => fields.map((field) => field.name), [fields]);
  const { name, value, type, options } = field;
  const [searchValue, setSearchValue] = useState("");
  // const [activeInput, setActiveInput] = useState<ActiveInput>(null);

  // const nameInputClass = {
  //   root: `${classes.root} ${activeInput === "name" ? classes["root_active"] : ""}`,
  //   input: `${classes.input} ${activeInput !== "name" ? classes["input_inactive"] : ""}`,
  // };
  // const valueInputClass = {
  //   root: `${classes.root} ${activeInput === "value" ? classes["root_active"] : ""}`,
  //   input: `${classes.input} ${activeInput === "name" ? classes["input_inactive"] : ""}`,
  // };

  // const isFieldExists = fieldNames.includes(name);

  return (
    <BaseFieldCard
      inputs={
        <>
          <Autocomplete
            // classNames={nameInputClass}
            variant="unstyled"
            placeholder="Field name"
            disabled={!editable}
            data={fields.map((field) => field.name)}
            renderOption={({ option }) => {
              const optionType = fields.find(
                (field) => field.name === option.value
              )?.type;

              return (
                <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {optionType === "INPUT" && <IconSquareLetterT />}
                  {optionType === "SELECT" && <IconSquareLetterS />}
                  {optionType === "MULTISELECT" && <IconSquareLetterM />}
                  {option.value}
                </Box>
              );
            }}
            value={name}
            onChange={(newName) => handleChangeName(newName, index)}
            onOptionSubmit={(value) => {
              const targetField = fields.find((field) => field.name === value);
              if (targetField) {
                handleChangeType(targetField.type, index);
                handleChangeOptions(targetField.options, index);
              }
            }}
            // onFocus={() => setActiveInput("name")}
            // onBlur={() => setActiveInput(null)}
          />

          {/* {opened && editable && (
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
          )} */}
          {type === "INPUT" && (
            <TextInput
              // classNames={valueInputClass}
              variant="unstyled"
              placeholder="Field value"
              disabled={!editable}
              value={value[0] ?? ""}
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
              value={value[0] ?? ""}
              onChange={(e) => handleChangeValue(e.target.value, index)}
              // onFocus={() => setActiveInput("value")}
              // onBlur={() => setActiveInput(null)}
            />
          )}
          {type === "SELECT" && (
            // <Select
            //   data={options}
            //   variant="unstyled"
            //   placeholder="Field value"
            //   searchable
            //   disabled={!editable}
            //   value={value[0]}
            //   onChange={(val) => val && handleChangeValue(val, index)}
            // />
            <Autocomplete
              data={options}
              variant="unstyled"
              placeholder="Field value"
              disabled={!editable}
              value={value[0] ?? ""}
              onChange={(val) => handleChangeValue(val, index)}
            />
          )}
          {type === "MULTISELECT" && (
            <MultiSelect
              // data={options}
              data={
                !options
                  ? undefined
                  : searchValue !== ""
                    ? [...new Set([...options, ...value, searchValue])]
                    : [...new Set([...options, ...value])]
              }
              variant="unstyled"
              placeholder="Field value"
              searchable
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              disabled={!editable}
              value={value.filter((val) => val !== "")}
              onChange={(val) => handleChangeValue(val, index)}
            />
            // <CustomMultiSelect />
          )}
        </>
      }
      actions={
        <>
          {editable && (
            <>
              {!isValid && (
                <ActionIcon size="lg" color="orange">
                  <IconAlertSquareRounded />
                </ActionIcon>
              )}

              <Menu>
                <Menu.Target>
                  <ActionIcon size="lg">
                    {/* {opened ? <IconChevronUp /> : <IconChevronDown />} */}
                    {type === "INPUT" && <IconLetterISmall />}
                    {type === "TEXTAREA" && <IconLetterTSmall />}
                    {type === "SELECT" && <IconLetterSSmall />}
                    {type === "MULTISELECT" && <IconLetterMSmall />}
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => handleChangeType("INPUT", index)}>
                    Input
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => handleChangeType("TEXTAREA", index)}
                  >
                    TextArea
                  </Menu.Item>
                  <Menu.Item onClick={() => handleChangeType("SELECT", index)}>
                    Select
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => handleChangeType("MULTISELECT", index)}
                  >
                    MultiSelect
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

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
