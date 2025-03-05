import { Box, Burger, Container, Title } from "@mantine/core";
import classes from "./style.module.css";
import { useDisclosure } from "@mantine/hooks";
import { JSX, ReactNode } from "react";

export function Header({
  title = "",
  btnGroup = <></>,
  children,
}: {
  title?: string;
  btnGroup?: JSX.Element;
  children?: ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        {children ? children : <Title order={3}>{title}</Title>}
        <Box>{btnGroup}</Box>
      </Container>
    </header>
  );
}
