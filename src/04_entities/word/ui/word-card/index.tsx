import { Link } from "@tanstack/react-router";
import { word } from "../../api/types";
import classes from "./classes.module.css";
import { useAppDispatch } from "src/05_shared/redux";
import { openedWordCard } from "../../model";

export function WordCard({ card }: { card: word }) {
  const dispatch = useAppDispatch();

  return (
    <Link
      to="/word-card"
      className={classes["link"]}
      onClick={() => dispatch(openedWordCard(card.id))}
    >
      <li className={classes["card"]}>
        {card.id} | {card.word}
      </li>
    </Link>
  );
}
