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
import { useMemo, useState } from "react";
import { DeleteWord } from "src/03_features/delete-word";
import { closedWordCard, wordSlice } from "src/04_entities/card/model";
import { SideMenu } from "src/04_entities/side-menu";
import { getAllCards } from "src/05_shared/api/card/get-all-cards";
import { cardId } from "src/05_shared/api/card/types";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";
import { useDynamicFields } from "src/05_shared/lib/useDynamicProps";
import { useAppDispatch, useAppSelector } from "src/05_shared/redux";
import { EditableField } from "src/05_shared/ui/card-text-info";
import { Header } from "src/05_shared/ui/header";
import { MainContainer } from "src/05_shared/ui/main-container";
import { useUpdateCard } from "../../../04_entities/card/api/use-update-card";
import classes from "./classes.module.css";

export function CardInfo() {
  const id = useAppSelector(wordSlice.selectors.selectOpenWordId);
  if (!id) return <Box>Error! wordId === null</Box>;

  return <CardInfoContent key={id} id={id} />;
}

function CardInfoContent({ id }: { id: cardId }) {
  const dispatch = useAppDispatch();
  const { data: cards } = useSuspenseQuery(getAllCards());
  const { data: fields } = useSuspenseQuery(getAllFields());
  const fieldNames = useMemo(() => fields.map((field) => field.name), [fields]);
  const [editable, setEditable] = useState(false);
  const updateWordMutation = useUpdateCard();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const {
    dynamicFields,
    handleFieldUpdate,
    handleFieldDelete,
    resetDynamicFields,
    addEmptyField,
  } = useDynamicFields(cards[id].fields);

  // const sortedList = properties.sort((a, b) => a.name.localeCompare(b.name));

  function handleEdit() {
    setEditable(!editable);
    resetDynamicFields();
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
    navigate({ to: "/" });
  }
  function handleResetChanges() {
    resetDynamicFields();
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
          setEditable(!editable);
          resetDynamicFields();
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
        to="/"
        onClick={() => dispatch(closedWordCard())}
      >
        <IconArrowBackUp />
      </ActionIcon>
    </ActionIcon.Group>
  );

  return (
    <>
      <Header title="Word info" btnGroup={btnGroup} menu={<SideMenu />} />
      <MainContainer>
        <form className={classes["body"]}>
          {dynamicFields.map((field, index) => (
            <EditableField
              key={index}
              initialName={field.name}
              initialValue={field.value}
              fieldNames={fieldNames}
              editable={editable}
              onUpdate={handleFieldUpdate}
              onDelete={handleFieldDelete}
              index={index}
            />
          ))}

          {editable && <Button onClick={addEmptyField}>Add prop</Button>}
        </form>
      </MainContainer>
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
