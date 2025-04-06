import { Box, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useAppDispatch } from "src/05_shared/redux";
import { wordCard } from "../../api/types";
import { openedWordCard } from "../../model";
import classes from "./classes.module.css";

export function WordCard({ card }: { card: wordCard }) {
  const dispatch = useAppDispatch();
  // const transcription =
  //   card.properties.find((prop) => prop.name === "transcription")?.value || "";
  // const translate =
  //   card.properties.find((prop) => prop.name === "translate")?.value || "";

  return (
    <Link
      to="/word-card"
      className={classes["link"]}
      onClick={() => dispatch(openedWordCard(card.id))}
    >
      <li className={classes["card"]}>
        <Box className={classes["card__left-section"]}>
          <Text>{card.fields[0].name}</Text>
          <Text>{card.id}</Text>
          {/* <Text>{card.word}</Text> */}
          {/* <Text>{transcription}</Text> */}
        </Box>
        <Box className={classes["card__right-section"]}>
          <Text>{card.fields[0].value}</Text>

          {/* <Text>{translate}</Text> */}
        </Box>
      </li>
    </Link>
  );
}
