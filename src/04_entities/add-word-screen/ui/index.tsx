import { Drawer, Textarea, TextInput } from "@mantine/core";

interface AddWordScreenProps {
  opened: boolean;
  close: () => void;
}
export function AddWordScreen({ opened, close }: AddWordScreenProps) {
  return (
    <Drawer opened={opened} onClose={close} title="Add a word" size={"xl"}>
      <form>
        <TextInput placeholder="word" />
        <TextInput placeholder="translate" />
        <TextInput placeholder="transcription" />
        <Textarea placeholder="definition in the language being studied" />
        <Textarea placeholder="source" />
      </form>
    </Drawer>
  );
}
