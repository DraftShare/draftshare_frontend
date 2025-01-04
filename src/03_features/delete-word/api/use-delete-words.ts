import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { deleteWords } from ".";


export function useDeleteWords() {

  return useMutation({
    mutationFn: deleteWords,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  })
}