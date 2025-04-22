import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { SET_OF_FIELDS_KEY } from "src/05_shared/api/query-const";
import { upsertSet } from "src/05_shared/api/set-of-fields/upsert-set";

export function useUpsertSet() {
  return useMutation({
    mutationFn: upsertSet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SET_OF_FIELDS_KEY] });
    },
  });
}
