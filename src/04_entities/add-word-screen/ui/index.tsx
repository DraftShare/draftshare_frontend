import { Button, Drawer, TextInput } from "@mantine/core";
import { useAddWord } from "../api/use-add-word";
import { useState } from "react";
import classes from "./classes.module.css";

interface AddWordScreenProps {
  opened: boolean;
  close: () => void;
}
export function AddWordScreen({ opened, close }: AddWordScreenProps) {
  const addWordMutation = useAddWord();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();
    addWordMutation.mutate(
      { word, transcription, translate },
      {
        onSuccess: () => {
          clearFields();
          close();
        },
      }
    );
  }
  const [word, setWord] = useState("");
  const [transcription, setTranscription] = useState("");
  const [translate, setTranslate] = useState("");

  function clearFields() {
    setWord("");
    setTranscription("");
    setTranslate("");
  }
  function handleClose() {
    clearFields();
    close();
  }

  //===================================

  function changeProperty(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "property" | "value"
  ) {
    setProperties((oldData) =>
      oldData.map((item, idx) =>
        idx === index ? { ...item, [field]: e.target.value } : item
      )
    );
  }
  function handleDelete(index: number) {
    setProperties((oldData) => oldData.filter((_, i) => i !== index));
  }

  interface property {
    property: string;
    value: string;
  }
  const [properties, setProperties] = useState<property[]>([]);

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title="Add a word"
      size={"xl"}
    >
      <form onSubmit={(e) => handleSubmit(e)} className={classes["form"]}>
        <TextInput
          placeholder="word"
          onChange={(e) => setWord(e.target.value)}
          value={word}
        />
        <TextInput
          placeholder="transcription"
          onChange={(e) => setTranscription(e.target.value)}
          value={transcription}
        />
        <TextInput
          placeholder="translate"
          onChange={(e) => setTranslate(e.target.value)}
          value={translate}
        />

        {/* <TextInput placeholder="transliteration" />
        <Textarea placeholder="definition in the language being studied" />
        <Textarea placeholder="context" />
        <Textarea placeholder="source" /> */}
        <Button type="submit">Create</Button>
      </form>

      <button
        onClick={() =>
          setProperties((oldData) => [{ property: "", value: "" }, ...oldData])
        }
        type="button"
      >
        Add propery
      </button>

      <form>
        {properties.map((property, index) => {
          return (
            <fieldset key={index}>
              <input
                placeholder="property"
                value={property.property}
                onChange={(e) => changeProperty(e, index, "property")}
              />
              <input
                placeholder="value"
                value={property.value}
                onChange={(e) => changeProperty(e, index, "value")}
              />
              <button type="button" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </fieldset>
          );
        })}
        <fieldset>
          <input placeholder="property" />
          <input placeholder="value" />
        </fieldset>
      </form>
    </Drawer>
  );
}
