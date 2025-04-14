import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { SET_OF_FIELDS_KEY } from "src/05_shared/api/query-keys";
import { changeDefaultSet } from "src/05_shared/api/set-of-fields/change-default-set";

export function useSetDefault() {
  return useMutation({
    mutationFn: changeDefaultSet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SET_OF_FIELDS_KEY] });
    },
  });
}
