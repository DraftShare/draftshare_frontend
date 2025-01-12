import { Link } from "@tanstack/react-router";
import { word } from "../../api/types";
import classes from "./classes.module.css";
import { useAppDispatch } from "src/05_shared/redux";
import { openedWordCard } from "../../model";
import { Box, Text } from "@mantine/core";

export function WordCard({ card }: { card: word }) {
  const dispatch = useAppDispatch();

  return (
    <Link
      to="/word-card"
      className={classes["link"]}
      onClick={() => dispatch(openedWordCard(card.id))}
    >
      <li className={classes["card"]}>
        <Box className={classes["card__left-section"]}>
          <Text>{card.word}</Text>
          <Text>{card.transcription}</Text>
        </Box>
        <Box className={classes["card__right-section"]}>
          <Text>{card.translate}</Text>
        </Box>
      </li>
    </Link>
  );
}
