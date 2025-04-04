import { ActionIcon, Box, Fieldset, TextInput } from "@mantine/core";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

import { IconSearch, IconTrash } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { BlockOfTwoButtons } from "src/05_shared/ui/blockOfTwoButtons";
import { useUpdateFields } from "../api/use-update-fields";
import { useDynamicFields } from "../lib/useDynamicFields";
import classes from "./style.module.css";

export function SettingsChangeProperties() {
  const [searchTerm, setSearchTerm] = useState("");
  const updateMutation = useUpdateFields();

  const {
    fields,
    handleChangeField,
    handleDeleteField,
    addEmptyField,
    dataToSend,
    // resetStore,
  } = useDynamicFields();

  const filteredList = useMemo(
    () =>
      fields.filter((field) => field.name.toLowerCase().includes(searchTerm)),
    [fields, searchTerm]
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMutation.mutate(dataToSend());
  }

  return (
    <>
      <Header title="Change properties" menu={<SideMenu />} />
      <Box className={classes["body"]}>
        <TextInput
          leftSection={<IconSearch />}
          placeholder="Search property"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <form className={classes["form"]} onSubmit={handleSubmit}>
          {filteredList.map((field, index) => (
            <FieldPanel
              key={field.id}
              index={index}
              value={field.name}
              handleDeleteField={handleDeleteField}
              handleChangeField={handleChangeField}
            />
          ))}

          <BlockOfTwoButtons addEmptyProp={addEmptyField} secondName="Save" />
        </form>
      </Box>
    </>
  );
}

function FieldPanel({
  index,
  value,
  handleDeleteField,
  handleChangeField,
}: {
  index: number;
  value: string;
  handleDeleteField: (index: number) => void;
  handleChangeField: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}) {
  return (
    <>
      <Fieldset>
        <Box
          style={{
            display: "flex",
          }}
        >
          <TextInput
            value={value}
            onChange={(e) => handleChangeField(e, index)}
          />
          <ActionIcon
            type="button"
            onClick={() => handleDeleteField(index)}
            size="lg"
          >
            <IconTrash />
          </ActionIcon>
        </Box>
      </Fieldset>
    </>
  );
}
