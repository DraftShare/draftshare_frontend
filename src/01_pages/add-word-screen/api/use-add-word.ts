import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { addOneCard } from "src/05_shared/api/card/add-one-card";
import { CARDS_KEY } from "src/05_shared/api/query-keys";

export function useAddWord() {
  return useMutation({
    mutationFn: addOneCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARDS_KEY] });
    },
  });
}
