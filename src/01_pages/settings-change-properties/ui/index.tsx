import { ActionIcon, Button, TextInput } from "@mantine/core";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

import { IconArrowBackUp, IconSearch, IconTrash } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { BottomBtnGroup } from "src/05_shared/ui/block-buttons/bottom-btn-group";
import { DashedBtn } from "src/05_shared/ui/buttons/dashed-btn";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { ListItemEntities } from "src/05_shared/ui/list-entities/list-item";
import { ListWrapEntities } from "src/05_shared/ui/list-entities/list-wrap";
import { MainContainer } from "src/05_shared/ui/main-container";
import { useUpdateFields } from "../api/use-update-fields";
import { useDynamicFields } from "../lib/useDynamicFields";
import classes from "./style.module.css";
import { Link } from "@tanstack/react-router";

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

  const btnGroup = (
    <ActionIcon.Group>
      <ActionIcon
        component={Link}
        to="/settings-page"
      >
        <IconArrowBackUp />
      </ActionIcon>
    </ActionIcon.Group>
  );

  return (
    <>
      <Header title="Change properties" menu={<SideMenu />} btnGroup={btnGroup} />
      <MainContainer>
        <TextInput
          leftSection={<IconSearch />}
          placeholder="Search property"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <form className={classes["form"]} onSubmit={handleSubmit}>
          <ListWrapEntities>
            <ListEntities>
              {filteredList.map((field, index) => (
                <FieldPanel
                  key={index}
                  index={index}
                  value={field.name}
                  handleDeleteField={handleDeleteField}
                  handleChangeField={handleChangeField}
                />
              ))}
            </ListEntities>
          </ListWrapEntities>

          <BottomBtnGroup>
            <DashedBtn onClick={addEmptyField} type="button">
              Add a property
            </DashedBtn>
            <Button type="submit">Save</Button>
          </BottomBtnGroup>
        </form>
      </MainContainer>
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
    <ListItemEntities>
      <TextInput
        value={value}
        onChange={(e) => handleChangeField(e, index)}
        rightSection={
          <ActionIcon type="button" onClick={() => handleDeleteField(index)}>
            <IconTrash />
          </ActionIcon>
        }
      />
    </ListItemEntities>
  );
}
