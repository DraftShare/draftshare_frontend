import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Fieldset,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { useAddWord } from "../api/use-add-word";
import { useState } from "react";
import classes from "./classes.module.css";
import { IconTrash } from "@tabler/icons-react";

interface AddWordScreenProps {
  opened: boolean;
  close: () => void;
}
export function AddWordScreen({ opened, close }: AddWordScreenProps) {
  const addWordMutation = useAddWord();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();
    addWordMutation.mutate(getResultObj(), {
      onSuccess: () => {
        setProperties(defaultProperties);
        close();
      },
    });
  }

  function handleClose() {
    setProperties(defaultProperties);
    close();
  }

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
    required?: boolean;
  }

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
  const [properties, setProperties] = useState<property[]>(defaultProperties);
  function getResultObj() {
    const result: { [key: string]: string } = {};
    properties.forEach((prop) => (result[prop.property] = prop.value));
    return result;
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
            if (property.required)
              return (
                <TextInput
                  key={index}
                  placeholder={property.property}
                  onChange={(e) => changeProperty(e, index, "value")}
                  value={property.value}
                  required
                />
              );

            return (
              <Fieldset
                key={index}
                variant="unstyled"
                className={classes["fieldset"]}
              >
                <Box className={classes["add-prpoerty-input__wrap"]}>
                  <TextInput
                    placeholder="property"
                    value={property.property}
                    onChange={(e) => changeProperty(e, index, "property")}
                  />
                  <TextInput
                    placeholder="value"
                    value={property.value}
                    onChange={(e) => changeProperty(e, index, "value")}
                  />
                </Box>

                <ActionIcon
                  type="button"
                  onClick={() => handleDelete(index)}
                  size="lg"
                >
                  <IconTrash />
                </ActionIcon>
              </Fieldset>
            );
          })}
        </Box>
        <Box className={classes["btn-group__wrap"]}>
          <Button.Group className={classes["btn-group"]}>
            <Button
              onClick={() =>
                setProperties((oldData) => [
                  ...oldData,
                  { property: "", value: "" },
                ])
              }
              type="button"
              className={classes["add-property-btn"]}
              classNames={{ root: classes["add-property-btn__root"] }}
            >
              Add a property
            </Button>
            <Button
              type="submit"
              className={classes["create-btn"]}
            >
              Create
            </Button>
          </Button.Group>
        </Box>
      </form>
    </Drawer>
  );
}
