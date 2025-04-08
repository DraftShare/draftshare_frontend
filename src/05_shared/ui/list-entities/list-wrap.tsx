import { ReactNode } from "react";
import classes from "./classes.module.css";

export function ListWrapEntities({ children }: { children: ReactNode }) {
  return <div className={classes["list-wrap"]}>{children}</div>;
}
