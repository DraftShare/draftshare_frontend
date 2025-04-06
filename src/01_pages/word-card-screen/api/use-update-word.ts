import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { updateOneWord } from ".";
import { CARDS_KEY } from "src/05_shared/api/query-keys";

export function useUpdateWord() {
  return useMutation({
    mutationFn: updateOneWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARDS_KEY] });
    },
  });
}
