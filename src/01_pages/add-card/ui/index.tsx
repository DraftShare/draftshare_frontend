import { ActionIcon, Button, LoadingOverlay, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { EditableField } from "src/04_entities/card/ui/editable-field";
import { SideMenu } from "src/04_entities/side-menu";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";
import { ROUTES } from "src/05_shared/api/query-const";
import { getAllSets } from "src/05_shared/api/set-of-fields/get-all-sets";
import { useDynamicFields } from "src/05_shared/lib/useDynamicFields";
import { BaseContainer } from "src/05_shared/ui/base-container";
import { BottomBtnGroup } from "src/05_shared/ui/block-buttons/bottom-btn-group";
import { DashedBtn } from "src/05_shared/ui/buttons/dashed-btn";
import { Header } from "src/05_shared/ui/header";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { Main } from "src/05_shared/ui/main";
import { useAddCard } from "../../../04_entities/card/api/use-add-card";
import classes from "./classes.module.css";

export function AddCard() {
  const { data: sets } = useSuspenseQuery(getAllSets());
  const { data: allFields } = useSuspenseQuery(getAllFields());
  const defaultSet = sets.find((set) => set.defaultSet);
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();
  const addWordMutation = useAddCard();

  const {
    fields: dynamicFields,
    handleChangeName,
    handleChangeValue,
    handleChangeType,
    handleChangeOptions,
    handleDeleteField,
    addEmptyField,
    // dataToSend,
    resetChanges,
  } = useDynamicFields(
    defaultSet?.fields.map((field) => ({ ...field, value: [""] })) || []
  );


  const fieldsValidity = useMemo(() => {
    const names = dynamicFields.map((field) => field.name);

    return dynamicFields.map((field, index) => {
      const isNameUnique = names.indexOf(field.name) === index;
      const isTypeConsistent = !allFields.some(
        (f) => f.name === field.name && f.type !== field.type
      );

      return !(field.name === "" || !isTypeConsistent || !isNameUnique);
    });
  }, [dynamicFields, allFields]);

  const isFormValid =
    fieldsValidity.every((valid) => valid) && dynamicFields.length > 0;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isFormValid) {
      addWordMutation.mutate(
        { fields: dynamicFields },
        {
          onSuccess: () => {
            resetChanges();
            navigate({ to: ROUTES.HOME });
          },
        }
      );
    } else {
      open();
    }
  }

  const btnGroup = (
    <ActionIcon.Group>
      <ActionIcon component={Link} to={ROUTES.HOME}>
        <IconArrowBackUp />
      </ActionIcon>
    </ActionIcon.Group>
  );

  return (
    <>
      <Header title="Add card" menu={<SideMenu />} btnGroup={btnGroup} />
      <Main>
        <BaseContainer>
          <LoadingOverlay
            visible={addWordMutation.isPending}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <form
            id="add-card-form"
            onSubmit={(e) => handleSubmit(e)}
            className={classes["form"]}
          >
            <ListEntities>
              {dynamicFields.map((field, index) => {
                return (
                  <EditableField
                    key={index}
                    field={field}
                    editable={true}
                    handleChangeName={handleChangeName}
                    handleChangeValue={handleChangeValue}
                    handleDeleteField={handleDeleteField}
                    handleChangeType={handleChangeType}
                    handleChangeOptions={handleChangeOptions}
                    index={index}
                    isValid={fieldsValidity[index]}
                    allFields={allFields}
                  />
                );
              })}
            </ListEntities>
          </form>
        </BaseContainer>
      </Main>
      <BottomBtnGroup>
        <DashedBtn onClick={addEmptyField}>Add a field</DashedBtn>
        <Button type="submit" form="add-card-form">
          Create
        </Button>
      </BottomBtnGroup>
      <Modal opened={opened} onClose={close} title="Validation failed" centered>
        <Text>Correct the errors and resend the form.</Text>
      </Modal>
    </>
  );
}
