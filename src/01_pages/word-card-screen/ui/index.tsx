import { ActionIcon, Box } from "@mantine/core";
import { IconArrowBackUp, IconEdit } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DeleteWord } from "src/03_features/delete-word";
import { Header } from "src/04_entities/header";
import { getAllWords } from "src/04_entities/word/api";
import { closedWordCard, wordSlice } from "src/04_entities/word/model";
import { useAppDispatch, useAppSelector } from "src/05_shared/redux";
import classes from "./classes.module.css";
import { CardTextInfo } from "src/05_shared/ui/card-text-info";
import { useState } from "react";

export function WordCardScreen() {
  const dispatch = useAppDispatch();
  const { data } = useSuspenseQuery(getAllWords());
  const [editable, setEditable] = useState(false);

  const id = useAppSelector((state) =>
    wordSlice.selectors.selectOpenWordId(state)
  );
  if (!id) return <Box>Error! wordId === null</Box>;

  const filteredData = Object.entries(data[id])
    .map(([key, value]) => {
      if (key !== "id" && key !== "_id") {
        return [key, value];
      }
      return null;
    })
    .filter((item) => item !== null);

  const returnBack = (
    <Link to="/" onClick={() => dispatch(closedWordCard())}>
      <ActionIcon>
        <IconArrowBackUp />
      </ActionIcon>
    </Link>
  );
  const editWordBtn = (
    <ActionIcon onClick={() => setEditable(true)}>
      <IconEdit />
    </ActionIcon>
  );

  return (
    <>
      <Header
        title="Word info"
        returnBack={returnBack}
        deleteWordIcon={<DeleteWord id={id} />}
        editWordBtn={editWordBtn}
        variant="word info"
      />
      <form className={classes["body"]}>
        {filteredData.map((item, index) => {
          return (
            <CardTextInfo
              key={index}
              label={item[0]}
              content={item[1]}
              disabled={!editable}
            />
          );
        })}
      </form>
    </>
  );
}
