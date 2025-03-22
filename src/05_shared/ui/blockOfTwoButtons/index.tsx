import { Box, Button } from "@mantine/core";

import classes from "./classes.module.css";

export function BlockOfTwoButtons({
  addEmptyProp,
  secondName,
}: {
  addEmptyProp: () => void;
  secondName: string;
}) {
  return (
    <>
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
            {secondName}
          </Button>
        </Button.Group>
      </Box>
    </>
  );
}
