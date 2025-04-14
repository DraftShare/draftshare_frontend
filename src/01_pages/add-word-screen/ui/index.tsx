import { Box, Drawer, LoadingOverlay } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";
import { useDynamicProps } from "src/05_shared/lib/useDynamicProps";
import { BlockOfTwoButtons } from "src/05_shared/ui/blockOfTwoButtons";
import { WordPropField } from "src/05_shared/ui/card-text-info/word-prop-field";
import { useAddCard } from "../../../04_entities/card/api/use-add-card";
import classes from "./classes.module.css";
import { getAllSets } from "src/05_shared/api/set-of-fields/get-all-sets";

interface AddWordScreenProps {
  opened: boolean;
  close: () => void;
}
export function AddWordScreen({ opened, close }: AddWordScreenProps) {
  const { data: fields } = useSuspenseQuery(getAllFields());
  const { data: sets } = useSuspenseQuery(getAllSets());
  const defaultSet = sets.find((set) => set.defaultSet);
  const fieldNames = fields.map((field) => field.name);

  const {
    properties,
    handleChangeProp,
    handleDeleteProp,
    resetProps,
    addEmptyProp,
    getProps,
  } = useDynamicProps(
    defaultSet?.fields.map((field) => ({ name: field.name, value: "" })) || []
  );
  const addWordMutation = useAddCard();

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
                fieldNames={fieldNames}
              />
            );
          })}
        </Box>
        {/* <BottomBtnGroup>
          <DashedBtn onClick={addEmptyProp} type="button">
            Add a property
          </DashedBtn>
          <Button type="submit">Create</Button>
        </BottomBtnGroup> */}
        <BlockOfTwoButtons addEmptyProp={addEmptyProp} secondName="Create" />
      </form>
    </Drawer>
  );
}
