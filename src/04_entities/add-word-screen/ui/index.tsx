import { Button, Drawer, Textarea, TextInput } from "@mantine/core";
import { useAddWord } from "../api/use-add-word";
import { useState } from "react";

interface AddWordScreenProps {
  opened: boolean;
  close: () => void;
}
export function AddWordScreen({ opened, close }: AddWordScreenProps) {
  const addWordMutation = useAddWord();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();
    addWordMutation.mutate({ word: word });
  }
  const [word, setWord] = useState("");

  return (
    <Drawer opened={opened} onClose={close} title="Add a word" size={"xl"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          placeholder="word"
          onChange={(e) => setWord(e.target.value)}
          value={word}
        />
        <TextInput placeholder="translate" />
        <TextInput placeholder="transcription" />
        <TextInput placeholder="transliteration" />
        <Textarea placeholder="definition in the language being studied" />
        <Textarea placeholder="context" />
        <Textarea placeholder="source" />
        <Button type="submit">Click</Button>
      </form>
    </Drawer>
  );
}
