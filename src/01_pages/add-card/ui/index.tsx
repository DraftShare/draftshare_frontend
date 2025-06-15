import { ActionIcon, Button, LoadingOverlay } from "@mantine/core";
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
  const { data: fields } = useSuspenseQuery(getAllFields());
  const { data: sets } = useSuspenseQuery(getAllSets());
  const defaultSet = sets.find((set) => set.defaultSet);
  const fieldNames = useMemo(
    () =>
      fields.map((field) => {
        // let prefix = "";
        // if (field.type === "INPUT") prefix = "I";
        // if (field.type === "TEXTAREA") prefix = "TA";
        // if (field.type === "SELECT") prefix = "S";
        // if (field.type === "MULTISELECT") prefix = "MS";

        // return prefix + " " + field.name;
        return field.name;
      }),
    [fields]
  );
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
    dataToSend,
    resetChanges,
  } = useDynamicFields(
    defaultSet?.fields.map((field) => ({ ...field, value: [""] })) || []
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addWordMutation.mutate(
      { fields: dynamicFields },
      {
        onSuccess: () => {
          resetChanges();
          navigate({ to: ROUTES.HOME });
        },
      }
    );
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
                    initialName={field.name}
                    initialValue={field.value}
                    type={field.type}
                    options={field.options}
                    fieldNames={fieldNames}
                    editable={true}
                    handleChangeName={handleChangeName}
                    handleChangeValue={handleChangeValue}
                    handleDeleteField={handleDeleteField}
                    handleChangeType={handleChangeType}
                    index={index}
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
    </>
  );
}
