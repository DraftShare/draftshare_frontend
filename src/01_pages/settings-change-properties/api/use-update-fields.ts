import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/05_shared/api";
import { update } from ".";

export function useUpdateFields() {
  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
    },
  });
}
