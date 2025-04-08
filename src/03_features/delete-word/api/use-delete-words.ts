import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { deleteManyCards } from "../../../05_shared/api/card/delete-many-cards";
import { useNavigate } from "@tanstack/react-router";
import { CARDS_KEY } from "src/05_shared/api/query-keys";

export function useDeleteWords() {
  const navigate = useNavigate({ from: "/word-card" });
  return useMutation({
    mutationFn: deleteManyCards,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARDS_KEY] });
      navigate({ to: "/" });
    },
  });
}
