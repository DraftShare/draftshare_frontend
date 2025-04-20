import { ActionIcon, Divider, TextInput } from "@mantine/core";
import { IconArrowBackUp, IconPlus, IconSearch } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

export function MainPageHeader({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [searchMod, setSearchMod] = useState(false);
  function handleCancelingSearch() {
    setSearchMod(false);
    setSearchTerm("");
  }

  const btnGroup = (
    <ActionIcon.Group>
      {!searchMod && (
        <>
          <ActionIcon onClick={() => setSearchMod(true)}>
            <IconSearch />
          </ActionIcon>
          <Divider orientation="vertical" />
        </>
      )}
      <ActionIcon component={Link} to="/add-card">
        <IconPlus />
      </ActionIcon>
    </ActionIcon.Group>
  );

  return (
    <Header title="All cards" btnGroup={btnGroup} menu={<SideMenu />}>
      {searchMod && (
        <TextInput
          leftSection={<IconSearch />}
          rightSection={
            <ActionIcon>
              <IconArrowBackUp onClick={handleCancelingSearch} />
            </ActionIcon>
          }
          placeholder="Type here.."
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
    </Header>
  );
}
