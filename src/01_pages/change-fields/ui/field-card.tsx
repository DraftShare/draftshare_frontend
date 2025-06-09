import { ActionIcon, Collapse, Group, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { FieldType } from "src/05_shared/api/field/types";
import { BaseFieldCard } from "src/05_shared/ui/base-field-card";

interface FieldCardProps {
  index: number;
  type: FieldType;
  name: string;
  options: string[];
  handleChangeName: (name: string, index: number) => void;
  handleChangeType: (type: FieldType, index: number) => void;
  handleDeleteField: (index: number) => void;
  handleChangeOptions: (options: string[], index: number) => void;
}

export function FieldCard({
  index,
  type,
  name,
  options,
  handleChangeName,
  handleChangeType,
  handleDeleteField,
  handleChangeOptions,
}: FieldCardProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      handleChangeOptions([...options, newOption.trim()], index);
      setNewOption("");
    }
  };
  const handleDeleteOption = (idx: number) => {
    handleChangeOptions(
      options.filter((_, i) => i !== idx),
      index
    );
  };

  const select = (
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
      onChange={(val) => val && handleChangeType(val as FieldType, index)}
    />
  );
  const toggleCollapse =
    type === "SELECT" || type === "MULTISELECT" ? (
      <ActionIcon onClick={toggle} size="lg">
        {opened ? <IconChevronUp /> : <IconChevronDown />}
      </ActionIcon>
    ) : (
      <></>
    );
  const footer = (
    <Collapse in={opened && (type === "SELECT" || type === "MULTISELECT")}>
      <Group>
        <TextInput
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="New option"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddOption();
          }}
        />
        <ActionIcon onClick={handleAddOption}>
          <IconPlus />
        </ActionIcon>
      </Group>
      {options.map((opt, idx) => (
        <Group key={opt + idx} align="center">
          <TextInput value={opt} readOnly />
          <ActionIcon color="red" onClick={() => handleDeleteOption(idx)}>
            <IconTrash />
          </ActionIcon>
        </Group>
      ))}
    </Collapse>
  );

  return (
    <BaseFieldCard
      inputs={
        <>
          <TextInput
            variant="unstyled"
            placeholder="Field name"
            value={name}
            onChange={(e) => handleChangeName(e.target.value, index)}
          />
          {select}
        </>
      }
      actions={
        <>
          {toggleCollapse}
          <ActionIcon
            size="lg"
            color="red"
            onClick={() => handleDeleteField(index)}
          >
            <IconTrash />
          </ActionIcon>
        </>
      }
      footer={footer}
    />
  );
}
