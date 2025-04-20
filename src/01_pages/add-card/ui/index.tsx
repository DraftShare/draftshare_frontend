import { Button, LoadingOverlay } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SideMenu } from "src/04_entities/side-menu";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";
import { getAllSets } from "src/05_shared/api/set-of-fields/get-all-sets";
import { useDynamicProps } from "src/05_shared/lib/useDynamicProps";
import { BottomBtnGroup } from "src/05_shared/ui/block-buttons/bottom-btn-group";
import { DashedBtn } from "src/05_shared/ui/buttons/dashed-btn";
import { WordPropField } from "src/05_shared/ui/card-text-info/word-prop-field";
import { Header } from "src/05_shared/ui/header";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { ListWrapEntities } from "src/05_shared/ui/list-entities/list-wrap";
import { MainContainer } from "src/05_shared/ui/main-container";
import { useAddCard } from "../../../04_entities/card/api/use-add-card";
import classes from "./classes.module.css";
import { EditableField } from "src/05_shared/ui/card-text-info";
import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";

export function AddCard() {
  const { data: fields } = useSuspenseQuery(getAllFields());
  const { data: sets } = useSuspenseQuery(getAllSets());
  const defaultSet = sets.find((set) => set.defaultSet);
  // const fieldNames = fields.map((field) => field.name);
  const fieldNames = useMemo(() => fields.map((field) => field.name), [fields]);

    const navigate = useNavigate();
  

  const {
    properties,
    handleChangeProp,
    handleFieldUpdate,
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
        navigate({ to: "/" });

      },
    });
  }

  return (
    <>
      <Header title="Add card" menu={<SideMenu />} />
      <MainContainer>
        <LoadingOverlay
          visible={addWordMutation.isPending}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={(e) => handleSubmit(e)} className={classes["form"]}>
          <ListWrapEntities>
            <ListEntities>
              {properties.map((field, index) => {
                return (
                  <EditableField
                    key={index}
                    initialName={field.name}
                    initialValue={field.value}
                    fieldNames={fieldNames}
                    editable={true}
                    // onUpdate={(name, value) =>
                    //   handleFieldUpdate(index, name, value)
                    // }
                    onUpdate={handleFieldUpdate}
                    onDelete={handleDeleteProp}
                    index={index}
                  />

                  // <WordPropField
                  //   key={index}
                  //   inputValue={[property.name, property.value]}
                  //   index={index}
                  //   handleChangeField={handleChangeProp}
                  //   handleDeleteProp={handleDeleteProp}
                  //   editable={true}
                  //   fieldNames={fieldNames}
                  // />
                );
              })}
            </ListEntities>
          </ListWrapEntities>

          <BottomBtnGroup>
            <DashedBtn onClick={addEmptyProp}>Add a field</DashedBtn>
            <Button type="submit">Create</Button>
          </BottomBtnGroup>
        </form>
      </MainContainer>
    </>
  );
}
