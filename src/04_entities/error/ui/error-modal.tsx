import { Button, Group, Modal, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "src/05_shared/redux";
import { errorSlice, setError } from "../model";

export const ErrorModal = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorSlice.selectors.selectError);

  const handleClose = () => dispatch(setError(null));

  return (
    <Modal opened={!!error} onClose={handleClose} title="Ошибка" centered>
      <Text color="red" mb="md">
        {error}
      </Text>
      <Group justify="flex-end">
        <Button onClick={handleClose}>Закрыть</Button>
      </Group>
    </Modal>
  );
};
