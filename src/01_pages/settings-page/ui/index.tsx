import { Accordion, Box, List, ListItem, Text } from "@mantine/core";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

import classes from "./classes.module.css";
import { Icon123 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import {
  AppRoutes,
  ROUTES
} from "src/05_shared/api/query-const";

export function SettingsPage() {
  const titles = [
    {
      image: <Icon123 />,
      label: "Field management",
      content: (
        <>
          <List>
            <ListItem>
              <Link to={SETTINGS_CHANGE_FIELDS_PATH}>
                <Text>Change fields</Text>
              </Link>
            </ListItem>
            <ListItem>
              <Link to={SETTINGS_SETS_OF_FIELDS_PATH}>
                <Text>Change field sets</Text>
              </Link>
            </ListItem>
          </List>
        </>
      ),
    },
    { image: <Icon123 />, label: "Misc", content: <></> },
  ];

  const items = titles.map((item, index) => (
    <Accordion.Item key={index} value={item.label}>
      <Accordion.Control icon={item.image}>{item.label}</Accordion.Control>
      <Accordion.Panel>{item.content}</Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <>
      <Header title="Settings" menu={<SideMenu />} />
      <Box className={classes["body"]}>
        <Accordion variant="separated" defaultValue={titles[0].label}>
          {items}
        </Accordion>
      </Box>
    </>
  );
}
