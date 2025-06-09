import {
  ActionIcon,
  Button,
  Flex,
  Menu,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

import { useDisclosure } from "@mantine/hooks";
import { IconArrowBackUp, IconSearch } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ROUTES } from "src/05_shared/api/query-const";
import { Banner } from "src/05_shared/ui/banners/banner";
import { BaseContainer } from "src/05_shared/ui/base-container";
import { BottomBtnGroup } from "src/05_shared/ui/block-buttons/bottom-btn-group";
import { DashedBtn } from "src/05_shared/ui/buttons/dashed-btn";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { Main } from "src/05_shared/ui/main";
import { useUpdateFields } from "../../../04_entities/field/api/use-update-fields";
import { useDynamicFields } from "../lib/useDynamicFields";
import classes from "./classes.module.css";
import { FieldCard } from "./field-card";

export function ChangeFields() {
  const [searchTerm, setSearchTerm] = useState("");
  const updateMutation = useUpdateFields();
  const [opened, { open, close }] = useDisclosure(false);

  const {
    fields,
    handleChangeName,
    handleDeleteField,
    addEmptyField,
    dataToSend,
    resetChanges,
    handleChangeType,
    handleChangeOptions,
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
      <Main>
        <BaseContainer>
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

            <ListEntities>
              {filteredList.map((field, index) => (
                <FieldCard
                  key={index}
                  index={index}
                  type={field.type}
                  name={field.name}
                  options={field.options ?? []}
                  handleChangeName={handleChangeName}
                  handleChangeType={handleChangeType}
                  handleDeleteField={handleDeleteField}
                  handleChangeOptions={handleChangeOptions}
                />
              ))}
            </ListEntities>
          </form>
        </BaseContainer>
      </Main>

      <BottomBtnGroup>
        <DashedBtn onClick={addEmptyField} type="button">
          Add a field
        </DashedBtn>
        {/* <Menu>
          <Menu.Target>
            <DashedBtn
              // onClick={addEmptyField}
              type="button"
            >
              Add a field
            </DashedBtn>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={addEmptyField}>Input</Menu.Item>
            <Menu.Item onClick={addEmptyField}>TextArea</Menu.Item>
            <Menu.Item onClick={addEmptyField}>Select</Menu.Item>
            <Menu.Item onClick={addEmptyField}>MultiSelect</Menu.Item>
          </Menu.Dropdown>
        </Menu> */}
        <Button type="button" onClick={handleSave}>
          Save
        </Button>
      </BottomBtnGroup>

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
