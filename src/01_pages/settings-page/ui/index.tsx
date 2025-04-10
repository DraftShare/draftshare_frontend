import { Accordion, Box, List, ListItem, Text } from "@mantine/core";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

import classes from "./style.module.css";
import { Icon123 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export function SettingsPage() {
  const titles = [
    {
      image: <Icon123 />,
      label: "Properties managment",
      content: (
        <>
          <List>
            <ListItem>
              <Link to={"/settings/change-fields"}>
                <Text>Change fields</Text>
              </Link>
            </ListItem>
            <ListItem>
              <Link to={"/settings/sets-of-fields"}>
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
