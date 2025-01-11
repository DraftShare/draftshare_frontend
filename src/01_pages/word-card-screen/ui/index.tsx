import { ActionIcon, Box, Text } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DeleteWord } from "src/03_features/delete-word";
import { Header } from "src/04_entities/header";
import { getAllWords } from "src/04_entities/word/api";
import { closedWordCard, wordSlice } from "src/04_entities/word/model";
import { useAppDispatch, useAppSelector } from "src/05_shared/redux";

export function WordCardScreen() {
  const dispatch = useAppDispatch();
  const { data } = useSuspenseQuery(getAllWords());

  const id = useAppSelector((state) =>
    wordSlice.selectors.selectOpenWordId(state)
  );
  if (!id) return <Box>Error! wordId === null</Box>;

  const returnBack = (
    <Link to="/" onClick={() => dispatch(closedWordCard())}>
      <ActionIcon>
        <IconArrowBackUp />
      </ActionIcon>
    </Link>
  );

  return (
    <>
      <Header
        title="Word info"
        returnBack={returnBack}
        deleteWordIcon={<DeleteWord id={id} />}
      />

      <Text>Id: {id}</Text>
      <Text>Word: {data[id].word}</Text>
      <Text>Transcription: {data[id].transcription}</Text>
      <Text>Translate: {data[id].translate}</Text>
    </>
  );
}
