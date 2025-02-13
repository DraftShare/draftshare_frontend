import { ActionIcon, Box, Fieldset, TextInput } from "@mantine/core";
import { IconLock, IconTrash } from "@tabler/icons-react";
import classes from "./classes.module.css";
import { useState } from "react";

export function WordPropField({
  inputProp,
  inputVal,
  index,
  handleChangeProp,
  handleDeleteProp,
  editable,
}: {
  inputProp: string;
  inputVal: string;
  index: number;
  handleChangeProp: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "property" | "value"
  ) => void;
  handleDeleteProp: (index: number) => void;
  editable: boolean;
}) {
  const [activeField, setActiveField] = useState<"prop" | "val" | null>(null);
  const readOnlyProp = inputProp === "word";

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
          onChange={(e) => handleChangeProp(e, index, "property")}
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
          onChange={(e) => handleChangeProp(e, index, "value")}
          onFocus={() => setActiveField("val")}
          onBlur={() => setActiveField(null)}
          disabled={!editable}
          required={inputProp === "word"}
        />
      </Box>

      {editable && !readOnlyProp && (
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
