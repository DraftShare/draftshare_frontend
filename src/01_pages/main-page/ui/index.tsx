import { useSuspenseQuery } from "@tanstack/react-query";
import { AddWordIcon } from "src/03_features/add-word";
import { Header } from "src/04_entities/header/ui";
import { WordCard } from "src/04_entities/word";
import classes from "./style.module.css";
import { getAllWords } from "src/04_entities/word/api";

export function MainPage() {
  const { data } = useSuspenseQuery(getAllWords());
  console.log(data);

  const listCards = Object.entries(data).map((card, index) => (
    <WordCard key={index} card={card[1]} />
  ));

  return (
    <>
      <Header title="All words" addIcon={<AddWordIcon />} variant="word list" />
      <ul className={classes["list-cards"]}>{listCards}</ul>
    </>
  );
}
