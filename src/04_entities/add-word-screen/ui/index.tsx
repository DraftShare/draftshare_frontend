import { Box, Drawer, LoadingOverlay } from "@mantine/core";
import { useDynamicProps } from "src/05_shared/lib/useDynamicProps";
import { BlockOfTwoButtons } from "src/05_shared/ui/blockOfTwoButtons";
import { WordPropField } from "src/05_shared/ui/card-text-info/word-prop-field";
import { useAddWord } from "../api/use-add-word";
import classes from "./classes.module.css";

interface AddWordScreenProps {
  opened: boolean;
  close: () => void;
}
export function AddWordScreen({ opened, close }: AddWordScreenProps) {
  // const defaultProperties: Property[] = [
  //   {
  //     name: "transcription",
  //     value: "",
  //   },
  //   {
  //     name: "translate",
  //     value: "",
  //   },
  // ];

  const {
    properties,
    handleChangeProp,
    handleDeleteProp,
    resetProps,
    addEmptyProp,
    getProps,
  } = useDynamicProps();
  const addWordMutation = useAddWord();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();
    addWordMutation.mutate(getProps(), {
      onSuccess: () => {
        resetProps();
        close();
      },
    });
  }

  function handleClose() {
    resetProps();
    close();
  }

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title="Add a word"
      size={"xl"}
      classNames={{
        body: classes["drawer__body"],
        content: classes["drawer__content"],
      }}
      pos="relative"
    >
      <LoadingOverlay
        visible={addWordMutation.isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={(e) => handleSubmit(e)} className={classes["form"]}>
        <Box className={classes["properties-list"]}>
          {properties.map((property, index) => {
            return (
              <WordPropField
                key={index}
                inputValue={[property.name, property.value]}
                index={index}
                handleChangeField={handleChangeProp}
                handleDeleteProp={handleDeleteProp}
                editable={true}
              />
            );
          })}
        </Box>
        <BlockOfTwoButtons addEmptyProp={addEmptyProp} secondName="Create" />
      </form>
    </Drawer>
  );
}
