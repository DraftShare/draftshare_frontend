import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { AddWordIcon } from "src/03_features";
import { Header } from "src/04_entities/header/ui";
import { addOneWord, getAllWords } from "../api";
import { Button } from "@mantine/core";
import { queryClient } from "src/05_shared/api";

export function MainPage() {
  const { data } = useSuspenseQuery(getAllWords());
  console.log(data);

  const mutation = useMutation({
    mutationFn: addOneWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  });

  return (
    <>
      <Header addIcon={<AddWordIcon />} />
      <Button
        onClick={() => {
          mutation.mutate({
            word: "one",
            translate: "один",
            definition: "...",
          });
        }}
      >
        Click
      </Button>
    </>
  );
}
