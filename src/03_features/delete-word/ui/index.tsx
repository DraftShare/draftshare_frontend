import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteWords } from "../api/use-delete-words";

export function DeleteWord({ id }: { id: string }) {
  const deleteWordsMutation = useDeleteWords();

  return (
    <ActionIcon>
      <IconTrash onClick={() => deleteWordsMutation.mutate([id])} />
    </ActionIcon>
  );
}
