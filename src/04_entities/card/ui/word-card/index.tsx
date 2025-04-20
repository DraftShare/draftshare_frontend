import { Box, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useAppDispatch } from "src/05_shared/redux";
import { ListItemEntities } from "src/05_shared/ui/list-entities/list-item";
import { wordCard } from "../../../../05_shared/api/card/types";
import { openedWordCard } from "../../model";
import classes from "./classes.module.css";
import { ListItemContainerEntities } from "src/05_shared/ui/list-entities/list-item-container";

export function WordCard({ card }: { card: wordCard }) {
  const dispatch = useAppDispatch();
  // const transcription =
  //   card.properties.find((prop) => prop.name === "transcription")?.value || "";
  // const translate =
  //   card.properties.find((prop) => prop.name === "translate")?.value || "";

  return (
    <ListItemEntities>
      <Link
        to="/card-info"
        className={classes["link"]}
        onClick={() => dispatch(openedWordCard(card.id))}
      >
        <ListItemContainerEntities>
          <Box className={classes["card__left-section"]}>
            {/* <Text>{card.fields[0] && card.fields[0].name || ""}</Text> */}
            {/* <Text>{card.id || ""}</Text> */}
            {/* <Text>{card.word}</Text> */}
            {/* <Text>{transcription}</Text> */}

            <Text>{card.fields[0] && card.fields[0].value || ""}</Text>
            <Text>{card.fields[1] && card.fields[1].value || ""}</Text>


          </Box>
          <Box className={classes["card__right-section"]}>
            {/* <Text>{card.fields[0].value || ""}</Text> */}
            {/* <Text>{translate}</Text> */}

            <Text>{card.fields[2] && card.fields[2].value || ""}</Text>

          </Box>
        </ListItemContainerEntities>
      </Link>
    </ListItemEntities>
  );
}
