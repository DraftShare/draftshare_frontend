import { Box, Burger, Container, Title } from "@mantine/core";
import classes from "./style.module.css";
import { useDisclosure } from "@mantine/hooks";
import { JSX } from "react";
// import { IconArrowBackUp, IconCheck } from "@tabler/icons-react";

export function Header({
  title = "",
  btnGroup = <></>,
}: {
  title?: string;
  btnGroup?: JSX.Element;
}) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <Group gap={5} visibleFrom="xs">
          {items}
        </Group> */}

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        <Title order={3}>{title}</Title>

        <Box>{btnGroup}</Box>
      </Container>
    </header>
  );
}
