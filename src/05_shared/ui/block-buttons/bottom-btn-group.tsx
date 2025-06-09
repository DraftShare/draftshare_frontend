import { Button } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./classes.module.css";
import { BaseContainer } from "../base-container";

export function BottomBtnGroup({ children }: { children: ReactNode }) {
  return (
    <div className={classes["btn-group-wrap"]}>
      <BaseContainer>
        <Button.Group className={classes["btn-group"]}>{children}</Button.Group>
      </BaseContainer>
    </div>
  );
}
