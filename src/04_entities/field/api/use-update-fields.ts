import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { updateAllFields } from "src/05_shared/api/field/update-all-fields";
import {
  CARDS_KEY,
  FIELDS_KEY,
  SET_OF_FIELDS_KEY,
} from "src/05_shared/api/query-keys";

export function useUpdateFields() {
  return useMutation({
    mutationFn: updateAllFields,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FIELDS_KEY] });
      queryClient.invalidateQueries({ queryKey: [CARDS_KEY] });
      queryClient.invalidateQueries({ queryKey: [SET_OF_FIELDS_KEY] });
    },
  });
}
