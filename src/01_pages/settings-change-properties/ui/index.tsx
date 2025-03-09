import { Accordion, Box, TextInput } from "@mantine/core";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

import classes from "./style.module.css";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export function SettingsChangeProperties() {
  const [searchTerm, setSearchTerm] = useState("");


  const mockProps = [
    {
      id: 0,
      name: "translate"
    },
    {
      id: 1,
      name: "transcription"
    },
    {
      id: 2,
      name: "part of speech"
    },
  ]

  return (
    <>
      <Header title="Change properties" menu={<SideMenu />} />
      <Box className={classes["body"]}>
        <TextInput
          leftSection={<IconSearch />}
          placeholder="Search property"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul>
          {mockProps.map(item => <li key={item.id}><TextInput /></li>)}
        </ul>

      </Box>
    </>
  );
}
