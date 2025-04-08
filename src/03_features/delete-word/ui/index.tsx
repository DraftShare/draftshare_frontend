import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteWords } from "../api/use-delete-words";
import { cardId } from "src/05_shared/api/card/types";

export function DeleteWord({ id }: { id: cardId }) {
  const deleteWordsMutation = useDeleteWords();

  return (
    <ActionIcon>
      <IconTrash onClick={() => deleteWordsMutation.mutate([id])} />
    </ActionIcon>
  );
}
