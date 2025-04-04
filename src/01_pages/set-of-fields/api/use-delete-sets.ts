import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { deleteMany } from ".";
import { SET_OF_FIELDS_KEY } from "src/05_shared/api/query-keys";

export function useDeleteSets() {
  return useMutation({
    mutationFn: deleteMany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SET_OF_FIELDS_KEY] });
    },
  });
}
