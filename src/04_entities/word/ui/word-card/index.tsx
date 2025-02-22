import { Link } from "@tanstack/react-router";
import { wordCard } from "../../api/types";
import classes from "./classes.module.css";
import { useAppDispatch } from "src/05_shared/redux";
import { openedWordCard } from "../../model";
import { Box, Text } from "@mantine/core";

export function WordCard({ card }: { card: wordCard }) {
  const dispatch = useAppDispatch();
  const transcription =
    card.properties.find((prop) => prop.name === "transcription")?.value || "";
  const translate =
    card.properties.find((prop) => prop.name === "translate")?.value || "";

  return (
    <Link
      to="/word-card"
      className={classes["link"]}
      onClick={() => dispatch(openedWordCard(card._id))}
    >
      <li className={classes["card"]}>
        <Box className={classes["card__left-section"]}>
          <Text>{card.word}</Text>
          <Text>{transcription}</Text>
        </Box>
        <Box className={classes["card__right-section"]}>
          <Text>{translate}</Text>
        </Box>
      </li>
    </Link>
  );
}
