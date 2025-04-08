import { Button } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./classes.module.css";

export function BottomBtnGroup({ children }: { children: ReactNode }) {
  return (
    <div className={classes["btn-group-wrap"]}>
      <Button.Group className={classes["btn-group"]}>{children}</Button.Group>
    </div>
  );
}
