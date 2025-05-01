import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
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
import { useUpdateFields } from "../../../04_entities/field/api/use-update-fields";
import { useDynamicFields } from "../lib/useDynamicFields";
import classes from "./classes.module.css";
import { Link } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import { Banner } from "src/05_shared/ui/banners/banner";
import { ROUTES } from "src/05_shared/api/query-const";

export function ChangeFields() {
  const [searchTerm, setSearchTerm] = useState("");
  const updateMutation = useUpdateFields();
  const [opened, { open, close }] = useDisclosure(false);

  const {
    fields,
    handleChangeField,
    handleDeleteField,
    addEmptyField,
    dataToSend,
    resetChanges,
  } = useDynamicFields();

  const filteredList = useMemo(
    () =>
      fields.filter((field) => field.name.toLowerCase().includes(searchTerm)),
    [fields, searchTerm]
  );

  function handleConfirmSave() {
    updateMutation.mutate(dataToSend());
    close();
  }

  function handleSave() {
    if (dataToSend().fieldsToDelete.length > 0) {
      open();
    } else {
      updateMutation.mutate(dataToSend());
    }
  }

  function handleReset() {
    resetChanges();
    close();
  }

  const btnGroup = (
    <ActionIcon.Group>
      <ActionIcon component={Link} to={ROUTES.SETTINGS}>
        <IconArrowBackUp />
      </ActionIcon>
    </ActionIcon.Group>
  );

  return (
    <>
      <Header title="Change fields" menu={<SideMenu />} btnGroup={btnGroup} />
      <MainContainer>
        <TextInput
          leftSection={<IconSearch />}
          placeholder="Search property"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <form className={classes["form"]}>
          {filteredList.length === 0 && (
            <Banner>
              No fields found. You can add a field by clicking on the "Add a
              field" button at the bottom of the screen.
            </Banner>
          )}
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
              Add a field
            </DashedBtn>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </BottomBtnGroup>
        </form>
      </MainContainer>
      <Modal opened={opened} onClose={close} title="Are you sure?" centered>
        <Text>
          Among the Fields that are being deleted is Field, which is used in
          Card and/or SetOfFields. If continued, the Field will be deleted from
          all SetOfFields and all Cards with all its data. The cards remaining
          without the Fields will also be deleted.
        </Text>
        <Flex justify={"space-between"} mt={20}>
          <Button onClick={handleReset}>Reset changes</Button>
          <Button type="button" onClick={handleConfirmSave}>
            Save
          </Button>
        </Flex>
      </Modal>
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
        placeholder="Type the name of the field..."
        rightSection={
          <ActionIcon type="button" onClick={() => handleDeleteField(index)}>
            <IconTrash />
          </ActionIcon>
        }
      />
    </ListItemEntities>
  );
}
