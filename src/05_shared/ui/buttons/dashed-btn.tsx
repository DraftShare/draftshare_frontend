import { Button, ButtonProps } from "@mantine/core";
import classes from "./classes.module.css";
import { ReactNode } from "react";

interface DashedBtnProps
  extends ButtonProps,
    Omit<React.ComponentPropsWithoutRef<"button">, keyof ButtonProps> {
  children: ReactNode;
  // onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  customProp?: string;
}

export function DashedBtn({ children, ...props }: DashedBtnProps) {
  return (
    <Button classNames={{ root: classes["dashed-btn__root"] }} {...props}>
      {children}
    </Button>
  );
}
