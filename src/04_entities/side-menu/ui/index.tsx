import { Burger, Drawer, Group, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu3, IconSettings } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import classes from "./classes.module.css";
import { ROUTES } from "src/05_shared/api/query-const";

export function SideMenu() {
  const [opened, { open, close }] = useDisclosure(false);

  const menuItems = [
    {
      icon: IconMenu3,
      title: "All cards",
      description: "Main page",
      link: ROUTES.HOME,
    },
    {
      icon: IconSettings,
      title: "Settings",
      description: "These are the settings, what else can I say..",
      link: ROUTES.SETTINGS,
    },
  ];

  const links = menuItems.map((item) => (
    <Link className={classes.subLink} key={item.title} to={item.link}>
      <Group wrap="nowrap" align="center">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            size={22}
            // color={theme.colors.blue[6]}
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </Link>
  ));

  return (
    <>
      <Burger opened={opened} onClick={open} size="sm" />
      <Drawer opened={opened} onClose={close} size={"75%"} title={"Menu"}>
        {links}
      </Drawer>
    </>
  );
}
