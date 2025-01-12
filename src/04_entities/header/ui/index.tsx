import { Box, Burger, Container, Title } from "@mantine/core";
import classes from "./style.module.css";
import { useDisclosure } from "@mantine/hooks";
import { JSX } from "react";

export function Header({
  title = "",
  addIcon,
  deleteWordIcon,
  returnBack,
  editWordBtn,
  variant = "none",
}: {
  title?: string;
  addIcon?: JSX.Element;
  deleteWordIcon?: JSX.Element;
  returnBack?: JSX.Element;
  editWordBtn?: JSX.Element;
  variant?: "word list" | "word info" | "none";
}) {
  const [opened, { toggle }] = useDisclosure(false);
  const btnGroup = () => {
    if (variant === "word list") {
      return <>{addIcon}</>;
    } else if (variant === "word info") {
      return (
        <>
          {deleteWordIcon}
          {editWordBtn}
          {returnBack}
        </>
      );
    } else return <></>;
  };

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <Group gap={5} visibleFrom="xs">
          {items}
        </Group> */}

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        <Title order={3}>{title}</Title>

        <Box>{btnGroup()}</Box>
      </Container>
    </header>
  );
}
