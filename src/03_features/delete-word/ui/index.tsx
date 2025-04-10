import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteCards } from "../../../04_entities/card/api/use-delete-cards";
import { cardId } from "src/05_shared/api/card/types";

export function DeleteWord({ id }: { id: cardId }) {
  const deleteWordsMutation = useDeleteCards();

  return (
    <ActionIcon>
      <IconTrash onClick={() => deleteWordsMutation.mutate([id])} />
    </ActionIcon>
  );
}
