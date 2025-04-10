import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { SET_OF_FIELDS_KEY } from "src/05_shared/api/query-keys";
import { deleteManySets } from "src/05_shared/api/set-of-fields/delete-many-sets";

export function useDeleteSets() {
  return useMutation({
    mutationFn: deleteManySets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SET_OF_FIELDS_KEY] });
    },
  });
}
