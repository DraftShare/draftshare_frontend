import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Text,
  TextInput
} from "@mantine/core";
import { IconArrowBackUp, IconArrowRight, IconTrash } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SideMenu } from "src/04_entities/side-menu";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";
import { BottomBtnGroup } from "src/05_shared/ui/block-buttons/bottom-btn-group";
import { Header } from "src/05_shared/ui/header";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { ListItemEntities } from "src/05_shared/ui/list-entities/list-item";
import { ListItemContainerEntities } from "src/05_shared/ui/list-entities/list-item-container";
import { ListWrapEntities } from "src/05_shared/ui/list-entities/list-wrap";
import { MainContainer } from "src/05_shared/ui/main-container";
import { setOfFields } from "../../../05_shared/api/set-of-fields/types";
import { useUpsertMutation } from "../api/use-upsert-mutation";

export function SetOfFieldsForm({
  initialData,
}: {
  initialData?: setOfFields;
}) {
  const { data: fields } = useSuspenseQuery(getAllFields());

  const fieldNames = fields.map((field) => field.name);
  const [nameOfSet, setNameOfSet] = useState(initialData?.name || "");
  const [fieldToAdd, setFieldToAdd] = useState("");
  const [fieldsInSet, setFieldsInSet] = useState<string[]>(
    initialData?.fields.map((field) => field.name) || []
  );
  const upsertMutation = useUpsertMutation();
  const navigate = useNavigate({ from: "/settings/sets-of-fields" });

  function handleAddField() {
    if (!fieldsInSet.includes(fieldToAdd)) {
      setFieldsInSet((oldData) => [...oldData, fieldToAdd]);
      setFieldToAdd("");
    }
  }

  function handleChangeAddField(val: string) {
    setFieldToAdd(val);
  }
  function handleDeleteField(val: string) {
    setFieldsInSet((oldData) => oldData.filter((item) => item !== val));
  }
  function handleSave() {
    upsertMutation.mutate(
      initialData?.id
        ? {
            id: Number(initialData?.id),
            name: nameOfSet,
            fields: fieldsInSet,
          }
        : {
            name: nameOfSet,
            fields: fieldsInSet,
          },
      {
        onSuccess: () => {
          navigate({ to: "/settings/sets-of-fields" });
        },
      }
    );
  }

    const btnGroup = (
      <ActionIcon.Group>
        <ActionIcon
          component={Link}
          to="/settings/sets-of-fields"
        >
          <IconArrowBackUp />
        </ActionIcon>
      </ActionIcon.Group>
    );

  return (
    <>
      <Header title="Edit set of field" menu={<SideMenu />} btnGroup={btnGroup} />
      <MainContainer>
        <Box>
          <Box mb={"lg"}>
            <TextInput
              label="Name of set"
              placeholder="Type here.."
              value={nameOfSet}
              onChange={(e) => setNameOfSet(e.target.value)}
            />
            <Autocomplete
              label="Specify the field"
              placeholder="Type here.."
              data={fieldNames}
              value={fieldToAdd}
              onChange={(val) => handleChangeAddField(val)}
              error={
                fieldsInSet.includes(fieldToAdd) &&
                "this field has already been added"
              }
              rightSection={
                <ActionIcon onClick={handleAddField}>
                  <IconArrowRight />
                </ActionIcon>
              }
            />
          </Box>

          <Text
            style={{
              fontWeight: 500,
              fontSize: "var(--input-label-size, var(--mantine-font-size-sm))",
            }}
          >
            List of fields
          </Text>

          <ListWrapEntities>
            <ListEntities>
              {fieldsInSet.map((field) => (
                <ListItemEntities key={field}>
                  <ListItemContainerEntities>
                    <Text>{field}</Text>
                    <ActionIcon
                      type="button"
                      onClick={() => handleDeleteField(field)}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </ListItemContainerEntities>
                </ListItemEntities>
              ))}
            </ListEntities>
          </ListWrapEntities>
          <BottomBtnGroup>
            <Button onClick={handleSave}>Save</Button>
          </BottomBtnGroup>
        </Box>
      </MainContainer>
    </>
  );
}
