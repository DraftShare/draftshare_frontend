import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { AddWordScreen } from "src/01_pages/add-word-screen";

export function SmallBtn() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon>
        <IconPlus onClick={open} />
      </ActionIcon>
      <AddWordScreen opened={opened} close={close} />
    </>
  );
}
