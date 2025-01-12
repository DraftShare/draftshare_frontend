import { TextInput } from "@mantine/core";
import classes from "./classes.module.css";
import { useState } from "react";

export function CardTextInfo({
  label,
  content = "",
  disabled,
}: {
  label: string;
  content: string | undefined;
  disabled: boolean;
}) {
  const [value, setValue] = useState(content);
  return (
    <TextInput
      disabled={disabled}
      label={label}
      placeholder={value === "" ? "Type here" : ""}
      variant="unstyled"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      classNames={{
        root: classes.root,
        label: classes.label,
        input: classes.input,
      }}
    />
    // <Box className={classes["card"]}>
    //   <Text classNames={{ root: classes.label }}>{label}</Text>
    //   <Text classNames={{ root: classes.content }}>{content}</Text>

    // </Box>
  );
}
