import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { useNavigate } from "@tanstack/react-router";
import { CARD_INFO_PATH, CARDS_KEY, ROOT_PATH } from "src/05_shared/api/query-const";
import { deleteManyCards } from "src/05_shared/api/card/delete-many-cards";

export function useDeleteCards() {
  const navigate = useNavigate({ from: CARD_INFO_PATH });
  return useMutation({
    mutationFn: deleteManyCards,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARDS_KEY] });
      navigate({ to: ROOT_PATH });
    },
  });
}
