import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { updateOneWord } from ".";

export function useUpdateWord() {
  return useMutation({
    mutationFn: updateOneWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  });
}
