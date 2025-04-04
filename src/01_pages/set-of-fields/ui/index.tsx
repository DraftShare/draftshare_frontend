import { Autocomplete, Box, Button, TextInput } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getAllFields } from "src/01_pages/settings-change-properties/api";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";
import { setOfFields } from "../api/types";
import { useUpsertMutation } from "../api/use-upsert-mutation";

export function SetOfFieldsForm({
  initialData,
}: {
  initialData?: setOfFields;
}) {
  //   {
  //   id,
  //   setName = "",
  //   existingFields = [],
  // }: {
  //   id?: SetId;
  //   setName?: SetName;
  //   existingFields?: Field[];
  // }
  const { data: fields } = useSuspenseQuery(getAllFields());
  // const { id } = useParams({ from: "/settings/set-of-fields/$id" });
  // const isEditMode = !!id;
  // const { data } = useQuery({
  //   queryKey: [SET_OF_FIELDS_KEY, id],
  //   queryFn: async () => {
  //     const data = await baseFetch(`api/sets-of-fields/${id}`);
  //     return setOfFieldsSchema.parse(data);
  //   },
  //   staleTime: 5 * 1000 * 60,
  //   enabled: isEditMode
  // });

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

  return (
    <>
      <Header title="Edit set of field" menu={<SideMenu />} />
      <Box>
        <TextInput
          placeholder="Name of set"
          value={nameOfSet}
          onChange={(e) => setNameOfSet(e.target.value)}
        />
        <Autocomplete
          data={fieldNames}
          value={fieldToAdd}
          onChange={(val) => handleChangeAddField(val)}
          error={
            fieldsInSet.includes(fieldToAdd) &&
            "this field has already been added"
          }
        />
        <Button onClick={handleAddField}>Add</Button>

        <ul>
          {fieldsInSet.map((field) => (
            <li key={field}>
              <Box>
                {field}
                <Button onClick={() => handleDeleteField(field)}>Del</Button>
              </Box>
            </li>
          ))}
        </ul>
        <Button onClick={handleSave}>Save</Button>
      </Box>
    </>
  );
}
