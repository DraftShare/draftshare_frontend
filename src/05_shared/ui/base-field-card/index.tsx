import { Fieldset } from "@mantine/core";
import { JSX } from "react";
import { ListItemEntities } from "../list-entities/list-item";
import classes from "./classes.module.css";

export function BaseFieldCard({
  inputs,
  actions,
  footer,
}: {
  inputs: JSX.Element;
  actions?: JSX.Element;
  footer?: JSX.Element;
}) {
  // const [activeInput, setActiveInput] = useState<ActiveInput>(null);

  // const nameInputClass = {
  //   root: `${classes.root} ${activeInput === "name" ? classes["root_active"] : ""}`,
  //   input: `${classes.input} ${activeInput !== "name" ? classes["input_inactive"] : ""}`,
  // };
  // const valueInputClass = {
  //   root: `${classes.root} ${activeInput === "value" ? classes["root_active"] : ""}`,
  //   input: `${classes.input} ${activeInput === "name" ? classes["input_inactive"] : ""}`,
  // };

  return (
    <ListItemEntities>
      <Fieldset variant="unstyled" className={classes["fieldset"]}>
        <div className={classes["input-wrap"]}>{inputs}</div>
        <div className={classes["actions-wrap"]}>{actions}</div>
        <div className={classes["footer"]}>{footer}</div>
      </Fieldset>
    </ListItemEntities>
  );
}
