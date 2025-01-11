import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { deleteWords } from ".";
import { useNavigate } from "@tanstack/react-router";

export function useDeleteWords() {
  const navigate = useNavigate({ from: "/word-card" });
  return useMutation({
    mutationFn: deleteWords,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
      navigate({ to: "/" });
    },
  });
}
