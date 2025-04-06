import { ActionIcon, Box, Button } from "@mantine/core";
import { IconArrowBackUp, IconCheck, IconEdit } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { DeleteWord } from "src/03_features/delete-word";
import { SideMenu } from "src/04_entities/side-menu";
import { getAllWords } from "src/04_entities/word/api";
import { cardId } from "src/04_entities/word/api/types";
import { closedWordCard, wordSlice } from "src/04_entities/word/model";
import { useDynamicProps } from "src/05_shared/lib/useDynamicProps";
import { useAppDispatch, useAppSelector } from "src/05_shared/redux";
import { WordPropField } from "src/05_shared/ui/card-text-info/word-prop-field";
import { Header } from "src/05_shared/ui/header";
import { useUpdateWord } from "../api/use-update-word";
import classes from "./classes.module.css";

export function WordCardScreen() {
  const id = useAppSelector(wordSlice.selectors.selectOpenWordId);
  if (!id) return <Box>Error! wordId === null</Box>;

  return <WordCardScreenContent key={id} id={id} />;
}

function WordCardScreenContent({ id }: { id: cardId }) {
  const dispatch = useAppDispatch();
  const { data } = useSuspenseQuery(getAllWords());
  const [editable, setEditable] = useState(false);
  const updateWordMutation = useUpdateWord();

  const {
    properties,
    // setDefaultProps,
    handleChangeProp,
    handleDeleteProp,
    resetProps,
    addEmptyProp,
    getProps,
  } = useDynamicProps(data[id].fields);

  // const id = useAppSelector((state) =>
  //   wordSlice.selectors.selectOpenWordId(state)
  // );
  // if (!id) return <Box>Error! wordId === null</Box>;

  // const filteredData = Object.entries(data[id])
  //   .map(([key, value]) => {
  //     if (key !== "id" && key !== "_id") {
  //       return { property: key, value };
  //     }
  //     return null;
  //   })
  //   .filter((item) => item !== null);

  // const dataProps = data[id].fields;

  function handleEdit() {
    setEditable(!editable);
    resetProps();
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();
    if (!id) return <Box>Error! wordId === null</Box>;
    updateWordMutation.mutate(
      { ...getProps(), id: id },
      {
        onSuccess: () => {
          // resetProps();
          setEditable(false);
        },
      }
    );
  }

  // const listProps = editable ? properties : dataProps;

  const btnGroup = editable ? (
    <>
      <ActionIcon form="word-card-form" type="submit">
        <IconCheck />
      </ActionIcon>
      <ActionIcon
        onClick={() => {
          setEditable(!editable);
          resetProps();
        }}
      >
        <IconArrowBackUp />
      </ActionIcon>
    </>
  ) : (
    <>
      <DeleteWord id={id} />
      <ActionIcon onClick={handleEdit}>
        <IconEdit />
      </ActionIcon>{" "}
      <Link to="/" onClick={() => dispatch(closedWordCard())}>
        <ActionIcon>
          <IconArrowBackUp />
        </ActionIcon>
      </Link>
    </>
  );

  return (
    <>
      <Header title="Word info" btnGroup={btnGroup} menu={<SideMenu />} />
      <form
        id="word-card-form"
        className={classes["body"]}
        onSubmit={(e) => handleSubmit(e)}
      >
        {properties.map((item, index) => (
          <WordPropField
            key={index}
            inputValue={[item.name, item.value]}
            index={index}
            handleChangeField={handleChangeProp}
            handleDeleteProp={handleDeleteProp}
            editable={editable}
          />
        ))}

        {editable && <Button onClick={addEmptyProp}>Add prop</Button>}
      </form>
    </>
  );
}
