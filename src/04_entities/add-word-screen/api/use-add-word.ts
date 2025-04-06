import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { addOneWord } from ".";
import { CARDS_KEY } from "src/05_shared/api/query-keys";

export function useAddWord() {
  return useMutation({
    mutationFn: addOneWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARDS_KEY] });
    },
  });
}
