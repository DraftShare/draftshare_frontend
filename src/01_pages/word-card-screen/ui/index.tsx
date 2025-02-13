import { ActionIcon, Box, Button } from "@mantine/core";
import { IconArrowBackUp, IconCheck, IconEdit } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DeleteWord } from "src/03_features/delete-word";
import { Header } from "src/04_entities/header";
import { getAllWords } from "src/04_entities/word/api";
import { closedWordCard, wordSlice } from "src/04_entities/word/model";
import { useAppDispatch, useAppSelector } from "src/05_shared/redux";
import classes from "./classes.module.css";
import { useState } from "react";
import { useDynamicProps } from "src/05_shared/lib/useDynamicProps";
import { WordPropField } from "src/05_shared/ui/card-text-info/word-prop-field";
import { useUpdateWord } from "../api/use-update-word";

export function WordCardScreen() {
  const dispatch = useAppDispatch();
  const { data } = useSuspenseQuery(getAllWords());
  const [editable, setEditable] = useState(false);
  const updateWordMutation = useUpdateWord();

  const {
    properties,
    setDefaultProps,
    handleChangeProp,
    handleDeleteProp,
    resetProps,
    addEmptyProp,
    getProps,
  } = useDynamicProps();

  const id = useAppSelector((state) =>
    wordSlice.selectors.selectOpenWordId(state)
  );
  if (!id) return <Box>Error! wordId === null</Box>;

  const filteredData = Object.entries(data[id])
    .map(([key, value]) => {
      if (key !== "id" && key !== "_id") {
        return { property: key, value };
      }
      return null;
    })
    .filter((item) => item !== null);

  function handleEdit() {
    setEditable(!editable);
    setDefaultProps(filteredData);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();
    if (!id) return <Box>Error! wordId === null</Box>;
    updateWordMutation.mutate(getProps("update", id), {
      onSuccess: () => {
        resetProps();
        setEditable(false);
      },
    });
  }

  const listProps = editable ? properties : filteredData;

  const btnGroup = editable ? (
    <>
      <ActionIcon form="word-card-form" type="submit">
        <IconCheck />
      </ActionIcon>
      <ActionIcon
        onClick={() => {
          setEditable(!editable);
          // resetProps()
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
      <Header title="Word info" btnGroup={btnGroup} />
      <form
        id="word-card-form"
        className={classes["body"]}
        onSubmit={(e) => handleSubmit(e)}
      >
        {listProps.map((item, index) => (
          <WordPropField
            inputProp={item.property}
            inputVal={item.value}
            index={index}
            handleChangeProp={handleChangeProp}
            handleDeleteProp={handleDeleteProp}
            editable={editable}
          />
        ))}

        {editable && <Button onClick={addEmptyProp}>Add prop</Button>}
      </form>
    </>
  );
}
