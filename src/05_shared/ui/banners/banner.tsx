import { Text } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./classes.module.css";

export function Banner({ children }: { children: ReactNode }) {
  return (
    <div className={classes.banner}>
      <Text>{children}</Text>
    </div>
  );
}
