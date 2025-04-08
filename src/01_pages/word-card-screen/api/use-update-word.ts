import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { updateOneCard } from "../../../05_shared/api/card/update-one-card";
import { CARDS_KEY } from "src/05_shared/api/query-keys";

export function useUpdateWord() {
  return useMutation({
    mutationFn: updateOneCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARDS_KEY] });
    },
  });
}
