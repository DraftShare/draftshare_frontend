import { ActionIcon, TextInput, Title } from "@mantine/core";
import { IconArrowBackUp, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { AddWordIcon } from "src/03_features/add-word";
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
    <>
      {!searchMod && (
        <ActionIcon>
          <IconSearch onClick={() => setSearchMod(true)} />
        </ActionIcon>
      )}
      <AddWordIcon />
    </>
  );

  return (
    <Header title="All words" btnGroup={btnGroup}>
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
