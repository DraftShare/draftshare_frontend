import { Box, Button, Drawer, LoadingOverlay } from "@mantine/core";
import { useAddWord } from "../api/use-add-word";
import classes from "./classes.module.css";
import { property, useDynamicProps } from "src/05_shared/lib/useDynamicProps";
import { WordPropField } from "src/05_shared/ui/card-text-info/word-prop-field";

interface AddWordScreenProps {
  opened: boolean;
  close: () => void;
}
export function AddWordScreen({ opened, close }: AddWordScreenProps) {
  const defaultProperties: property[] = [
    {
      property: "word",
      value: "",
      required: true,
    },
    {
      property: "transcription",
      value: "",
    },
    {
      property: "translate",
      value: "",
    },
  ];
  const {
    properties,
    handleChangeProp,
    handleDeleteProp,
    resetProps,
    addEmptyProp,
    getProps,
  } = useDynamicProps(defaultProperties);
  const addWordMutation = useAddWord();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();
    addWordMutation.mutate(getProps("add"), {
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
                inputProp={property.property}
                inputVal={property.value}
                index={index}
                handleChangeProp={handleChangeProp}
                handleDeleteProp={handleDeleteProp}
                editable={true}
              />
            );
          })}
        </Box>
        <Box className={classes["btn-group__wrap"]}>
          <Button.Group className={classes["btn-group"]}>
            <Button
              onClick={addEmptyProp}
              type="button"
              className={classes["add-property-btn"]}
              classNames={{ root: classes["add-property-btn__root"] }}
            >
              Add a property
            </Button>
            <Button type="submit" className={classes["create-btn"]}>
              Create
            </Button>
          </Button.Group>
        </Box>
      </form>
    </Drawer>
  );
}
