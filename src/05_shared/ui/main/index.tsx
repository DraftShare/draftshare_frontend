import { ReactNode } from "react";
import classes from "./classes.module.css";

export function Main({ children }: { children: ReactNode }) {
  return <main className={classes.main}>{children}</main>;
}
