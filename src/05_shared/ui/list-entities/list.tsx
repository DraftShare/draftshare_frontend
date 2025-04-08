import { ReactNode } from "react";
import classes from "./classes.module.css";

export function ListEntities({ children }: { children: ReactNode }) {
  return <ul className={classes.list}>{children}</ul>;
}
