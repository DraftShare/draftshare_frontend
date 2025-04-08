import { ReactNode } from "react";
import classes from "./classes.module.css";

export function ListItemEntities({ children }: { children: ReactNode }) {
  return <li className={classes["list-item"]}>{children}</li>;
}
