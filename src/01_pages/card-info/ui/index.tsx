import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBackUp, IconCheck, IconEdit } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { DeleteWord } from "src/03_features/delete-word";
import { closedWordCard, wordSlice } from "src/04_entities/card/model";
import { SideMenu } from "src/04_entities/side-menu";
import { getAllCards } from "src/05_shared/api/card/get-all-cards";
import { cardId } from "src/05_shared/api/card/types";
import { useAppDispatch, useAppSelector } from "src/05_shared/redux";
import { BaseContainer } from "src/05_shared/ui/base-container";
import { Header } from "src/05_shared/ui/header";
import { useUpdateCard } from "../../../04_entities/card/api/use-update-card";
// import classes from "./classes.module.css";
import { EditableField } from "src/04_entities/card/ui/editable-field";
import { ROUTES } from "src/05_shared/api/query-const";
import { useDynamicFields } from "src/05_shared/lib/useDynamicFields";
import { BottomBtnGroup } from "src/05_shared/ui/block-buttons/bottom-btn-group";
import { DashedBtn } from "src/05_shared/ui/buttons/dashed-btn";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { Main } from "src/05_shared/ui/main";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";

export function CardInfo() {
  const id = useAppSelector(wordSlice.selectors.selectOpenWordId);
  if (!id) return <Box>Error! wordId === null</Box>;

  return <CardInfoContent key={id} id={id} />;
}

function CardInfoContent({ id }: { id: cardId }) {
  const dispatch = useAppDispatch();
  const { data: cards } = useSuspenseQuery(getAllCards());
  const { data: allFields } = useSuspenseQuery(getAllFields());
  const [editable, setEditable] = useState(false);
  const updateWordMutation = useUpdateCard();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const {
    fields: dynamicFields,
    handleChangeName,
    handleChangeValue,
    handleChangeType,
    handleChangeOptions,
    handleDeleteField,
    addEmptyField,
    resetChanges,
  } = useDynamicFields(cards[id].fields);

  // const sortedList = properties.sort((a, b) => a.name.localeCompare(b.name));

  function handleEdit() {
    setEditable(!editable);
    resetChanges();
  }

  function runMutation() {
    updateWordMutation.mutate(
      { fields: dynamicFields, id: id },
      {
        onSuccess: () => {
          setEditable(false);
        },
      }
    );
  }

  function handleSave() {
    if (dynamicFields.length === 0) {
      open();
    } else {
      runMutation();
    }
  }
  function handleConfirmSave() {
    runMutation();
    close();
    navigate({ to: ROUTES.HOME });
  }
  function handleResetChanges() {
    resetChanges();
    close();
  }

  const btnGroup = editable ? (
    <ActionIcon.Group>
      <ActionIcon onClick={handleSave}>
        <IconCheck />
      </ActionIcon>
      <Divider orientation="vertical" />
      <ActionIcon
        onClick={() => {
          resetChanges();
          setEditable(!editable);
        }}
      >
        <IconArrowBackUp />
      </ActionIcon>
    </ActionIcon.Group>
  ) : (
    <ActionIcon.Group>
      <DeleteWord id={id} />
      <Divider orientation="vertical" />
      <ActionIcon onClick={handleEdit}>
        <IconEdit />
      </ActionIcon>
      <Divider orientation="vertical" />
      <ActionIcon
        component={Link}
        to={ROUTES.HOME}
        onClick={() => dispatch(closedWordCard())}
      >
        <IconArrowBackUp />
      </ActionIcon>
    </ActionIcon.Group>
  );

  return (
    <>
      <Header title="Card info" btnGroup={btnGroup} menu={<SideMenu />} />
      <Main>
        <BaseContainer>
          <form>
            <ListEntities>
              {dynamicFields.map((field, index) => (
                <EditableField
                  key={index}
                  field={field}
                  editable={editable}
                  handleChangeName={handleChangeName}
                  handleChangeValue={handleChangeValue}
                  handleDeleteField={handleDeleteField}
                  handleChangeType={handleChangeType}
                  handleChangeOptions={handleChangeOptions}
                  index={index}
                  isValid={true}
                  allFields={allFields}
                />
              ))}
            </ListEntities>
          </form>
        </BaseContainer>
      </Main>
      {editable && (
        <BottomBtnGroup>
          <DashedBtn onClick={addEmptyField}>Add a field</DashedBtn>
        </BottomBtnGroup>
      )}
      <Modal opened={opened} onClose={close} title="Are you sure?" centered>
        <Text>
          The card cannot exist without fields and will therefore be deleted.
          Are you sure you want to delete this card?
        </Text>
        <Flex justify={"space-between"} mt={20}>
          <Button onClick={handleResetChanges}>Reset changes</Button>
          <Button onClick={handleConfirmSave}>Save</Button>
        </Flex>
      </Modal>
    </>
  );
}
