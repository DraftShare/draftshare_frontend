import { ActionIcon, TextInput } from "@mantine/core";
import classes from "./classes.module.css";
import { IconTrash } from "@tabler/icons-react";

export function CardTextInfo({
  label,
  content = "",
  editable,
  onChangeValue,
  handleDelete,
}: {
  label: string;
  content: string | undefined;
  editable: boolean;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
}) {
  // const [value, setValue] = useState(content);
  return (
    <TextInput
      disabled={!editable}
      label={label}
      // placeholder={value === "" ? "Type here" : ""}
      variant="unstyled"
      value={content}
      // onChange={(e) => setValue(e.target.value)}
      onChange={onChangeValue}
      classNames={{
        root: classes.root,
        label: classes.label,
        input: classes.input,
      }}
      rightSection={editable &&
        <ActionIcon>
          <IconTrash onClick={handleDelete} />
        </ActionIcon>
      }
    />
    // <Box className={classes["card"]}>
    //   <Text classNames={{ root: classes.label }}>{label}</Text>
    //   <Text classNames={{ root: classes.content }}>{content}</Text>

    // </Box>
  );
}
