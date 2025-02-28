import { ActionIcon, Box, Fieldset, TextInput } from "@mantine/core";
import { IconLock, IconTrash } from "@tabler/icons-react";
import classes from "./classes.module.css";
import { useState } from "react";
import { PropField } from "src/05_shared/lib/useDynamicProps";

export function WordPropField({
  inputProp,
  inputVal,
  index,
  handleChangeProp,
  handleDeleteProp,
  handleChangeWord,
  editable,
  readOnlyProp = false,
  readOnlyVal = false,
}: {
  inputProp: string;
  inputVal: string;
  index?: number;
  handleChangeProp?: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: PropField
  ) => void;
  handleDeleteProp?: (index: number) => void;
  handleChangeWord?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editable: boolean;
  readOnlyProp?: boolean;
  readOnlyVal?: boolean;
}) {
  const [activeField, setActiveField] = useState<"prop" | "val" | null>(null);
  // const readOnlyProp = inputProp === "word";

  const handleChange = function (field: PropField) {
    if (handleChangeWord) {
      return (e: React.ChangeEvent<HTMLInputElement>) => handleChangeWord(e);
    }
    if (index !== undefined && handleChangeProp) {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        handleChangeProp(e, index, field);
    }
  };
  if (!handleChange) return <Box>Error handleChange === undefined</Box>;

  return (
    <Fieldset variant="unstyled" className={classes["fieldset-n"]}>
      <Box className={classes["add-prpoerty-input__wrap-n"]}>
        <TextInput
          classNames={{
            root: `${classes.root} ${activeField === "prop" ? classes["root_active"] : ""}`,
            input: `${classes.input} ${activeField !== "prop" ? classes["input_inactive"] : ""}`,
          }}
          variant="unstyled"
          placeholder="property"
          value={inputProp}
          onChange={handleChange("name")}
          onFocus={() => setActiveField("prop")}
          onBlur={() => setActiveField(null)}
          disabled={!editable || readOnlyProp}
          rightSection={editable && readOnlyProp && <IconLock />}
        />
        <TextInput
          classNames={{
            root: `${classes.root} ${activeField === "val" ? classes["root_active"] : ""}`,
            input: `${classes.input} ${activeField === "prop" ? classes["input_inactive"] : ""}`,
          }}
          variant="unstyled"
          placeholder="value"
          value={inputVal}
          onChange={handleChange("value")}
          onFocus={() => setActiveField("val")}
          onBlur={() => setActiveField(null)}
          disabled={!editable || readOnlyVal}
          required={inputProp === "word"}
        />
      </Box>

      {editable && !readOnlyProp && index !== undefined && handleDeleteProp && (
        <ActionIcon
          type="button"
          onClick={() => handleDeleteProp(index)}
          size="lg"
        >
          <IconTrash />
        </ActionIcon>
      )}
    </Fieldset>
  );
}
