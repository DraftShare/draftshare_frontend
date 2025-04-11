import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Text,
} from "@mantine/core";
import { IconArrowBackUp, IconCheck, IconEdit } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { DeleteWord } from "src/03_features/delete-word";
import { SideMenu } from "src/04_entities/side-menu";
import { getAllCards } from "src/05_shared/api/card/get-all-cards";
import { cardId } from "src/05_shared/api/card/types";
import { closedWordCard, wordSlice } from "src/04_entities/card/model";
import { useDynamicProps } from "src/05_shared/lib/useDynamicProps";
import { useAppDispatch, useAppSelector } from "src/05_shared/redux";
import { WordPropField } from "src/05_shared/ui/card-text-info/word-prop-field";
import { Header } from "src/05_shared/ui/header";
import { useUpdateCard } from "../../../04_entities/card/api/use-update-card";
import classes from "./classes.module.css";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";
import { MainContainer } from "src/05_shared/ui/main-container";
import { useDisclosure } from "@mantine/hooks";

export function WordCardScreen() {
  const id = useAppSelector(wordSlice.selectors.selectOpenWordId);
  if (!id) return <Box>Error! wordId === null</Box>;

  return <WordCardScreenContent key={id} id={id} />;
}

function WordCardScreenContent({ id }: { id: cardId }) {
  const dispatch = useAppDispatch();
  const { data } = useSuspenseQuery(getAllCards());
  const { data: fields } = useSuspenseQuery(getAllFields());
  const fieldNames = fields.map((field) => field.name);
  const [editable, setEditable] = useState(false);
  const updateWordMutation = useUpdateCard();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const {
    properties,
    handleChangeProp,
    handleDeleteProp,
    resetProps,
    addEmptyProp,
    getProps,
  } = useDynamicProps(data[id].fields);

  // const sortedList = properties.sort((a, b) => a.name.localeCompare(b.name));

  function handleEdit() {
    setEditable(!editable);
    resetProps();
  }

  function runMutation() {
    updateWordMutation.mutate(
      { ...getProps(), id: id },
      {
        onSuccess: () => {
          setEditable(false);
        },
      }
    );
  }

  function handleSave() {
    if (getProps().fields.length === 0) {
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
  function handleReset() {
    resetProps();
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
          resetProps();
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
          {properties.map((item, index) => (
            <WordPropField
              key={index}
              inputValue={[item.name, item.value]}
              index={index}
              handleChangeField={handleChangeProp}
              handleDeleteProp={handleDeleteProp}
              editable={editable}
              fieldNames={fieldNames}
            />
          ))}

          {editable && <Button onClick={addEmptyProp}>Add prop</Button>}
        </form>
      </MainContainer>
      <Modal opened={opened} onClose={close} title="Are you sure?" centered>
        <Text>
          The card cannot exist without fields and will therefore be deleted.
          Are you sure you want to delete this card?
        </Text>
        <Flex justify={"space-between"} mt={20}>
          <Button onClick={handleReset}>Reset changes</Button>
          <Button onClick={handleConfirmSave}>Save</Button>
        </Flex>
      </Modal>
    </>
  );
}
