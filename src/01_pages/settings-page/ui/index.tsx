import { Accordion, Text, ThemeIcon } from "@mantine/core";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

import { IconArticle, IconInputSpark } from "@tabler/icons-react";
import { JSX } from "react";
import { AppRoutes, ROUTES } from "src/05_shared/api/query-const";
import { BaseContainer } from "src/05_shared/ui/base-container";
import { PlainLink } from "src/05_shared/ui/plain-link";
import classes from "./classes.module.css";
import { Main } from "src/05_shared/ui/main";

export function SettingsPage() {
  const titles = [
    {
      label: "Field management",
      content: (
        <ul className={classes.list}>
          <SettingsItem
            title="Change fields"
            linkPath={ROUTES.CHANGE_FIELDS}
            icon={<IconInputSpark />}
          />
          <SettingsItem
            title="Change field sets"
            linkPath={ROUTES.SETS_OF_FIELDS}
            icon={<IconArticle />}
          />
        </ul>
      ),
    },
    { label: "Misc", content: <></> },
  ];

  const items = titles.map((item, index) => (
    <Accordion.Item key={index} value={item.label}>
      <Accordion.Control>{item.label}</Accordion.Control>
      <Accordion.Panel>{item.content}</Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <>
      <Header title="Settings" menu={<SideMenu />} />
      <Main>
        <BaseContainer>
          <Accordion variant="separated" defaultValue={titles[0].label}>
            {items}
          </Accordion>
        </BaseContainer>
      </Main>
    </>
  );
}

function SettingsItem({
  title,
  linkPath,
  icon,
}: {
  title: string;
  linkPath: AppRoutes;
  icon: JSX.Element;
}) {
  return (
    <li className={classes["list-item"]}>
      <PlainLink to={linkPath} className={classes.link}>
        <ThemeIcon variant="transparent">{icon}</ThemeIcon>
        <Text>{title}</Text>
      </PlainLink>
    </li>
  );
}
