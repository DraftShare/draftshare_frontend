import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { useNavigate } from "@tanstack/react-router";
import { CARDS_KEY, ROUTES } from "src/05_shared/api/query-const";
import { deleteManyCards } from "src/05_shared/api/card/delete-many-cards";

export function useDeleteCards() {
  const navigate = useNavigate({ from: ROUTES.CARD_INFO });
  return useMutation({
    mutationFn: deleteManyCards,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARDS_KEY] });
      navigate({ to: ROUTES.HOME });
    },
  });
}
