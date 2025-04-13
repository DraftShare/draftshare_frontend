import { Box, Container, Title } from "@mantine/core";
import { JSX, ReactNode } from "react";
import classes from "./classes.module.css";

export function Header({
  title = "",
  btnGroup = <></>,
  children,
  menu
}: {
  title?: string;
  btnGroup?: JSX.Element;
  children?: ReactNode;
  menu: JSX.Element;
}) {
  // const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          {menu}
          {/* <Burger opened={opened} onClick={open} hiddenFrom="xs" size="sm" />
          <Drawer opened={opened} onClose={close} size={"75%"}>efef</Drawer> */}

          {children ? children : <Title order={3}>{title}</Title>}
          <Box>{btnGroup}</Box>
        </Container>
      </header>
    </>
  );
}
