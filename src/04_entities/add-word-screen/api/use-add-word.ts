import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { addOneWord } from ".";

export function useAddWord() {
  return useMutation({
    mutationFn: addOneWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  });
}
