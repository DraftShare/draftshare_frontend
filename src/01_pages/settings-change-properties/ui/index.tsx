import { Box, TextInput } from "@mantine/core";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

import classes from "./style.module.css";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { WordPropField } from "src/05_shared/ui/card-text-info/word-prop-field";
import { useDynamicProps } from "src/05_shared/lib/useDynamicProps";
import { BlockOfTwoButtons } from "src/05_shared/ui/blockOfTwoButtons";

export function SettingsChangeProperties() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockProps = [
    {
      id: 0,
      name: "translate",
    },
    {
      id: 1,
      name: "transcription",
    },
    {
      id: 2,
      name: "part of speech",
    },
  ];

  const {
    properties,
    handleChangeProp,
    handleDeleteProp,
    // resetProps,
    addEmptyProp,
    // getProps,
  } = useDynamicProps(mockProps);

  const filteredList = properties.filter((prop) =>
    prop.name.toLowerCase().includes(searchTerm)
  );

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

        <form className={classes["form"]}>
          {filteredList.map((item, index) => (
            <WordPropField
              key={index}
              inputValue={[item.name, ""]}
              index={index}
              handleChangeProp={handleChangeProp}
              handleDeleteProp={handleDeleteProp}
              editable={true}
              display="name"
            />
          ))}

          <BlockOfTwoButtons addEmptyProp={addEmptyProp} secondName="Save" />
        </form>
      </Box>
    </>
  );
}
