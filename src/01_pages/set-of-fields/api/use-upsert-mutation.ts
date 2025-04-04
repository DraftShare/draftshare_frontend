import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import {  upsert } from ".";
import { SET_OF_FIELDS_KEY } from "src/05_shared/api/query-keys";

export function useUpsertMutation() {
  return useMutation({
    mutationFn: upsert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SET_OF_FIELDS_KEY] });
    },
  });
}
