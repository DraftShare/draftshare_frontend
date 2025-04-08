import { ReactNode } from "react";
import classes from "./classes.module.css";

export function ListItemContainerEntities({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={classes["list-item-container"]}>{children}</div>;
}
