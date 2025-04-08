import { Box, Button, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { SetId } from "src/05_shared/api/set-of-fields/types";
import { useDeleteSets } from "src/01_pages/set-of-fields/api/use-delete-sets";
import { Field } from "src/05_shared/api/field/types";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";
import { getAllSets } from "src/05_shared/api/set-of-fields/get-all-sets";

export function SetsOfFields() {
  const { data } = useSuspenseQuery(getAllSets());

  return (
    <>
      <Header title="Change field sets" menu={<SideMenu />} />

      {data.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          fields={item.fields}
        />
      ))}

      <Link to="/settings/set-of-fields">Add new set</Link>
    </>
  );
}

function Card({ id, name }: { id: SetId; name: string; fields: Field[] }) {
  const deleteMutation = useDeleteSets();

  function handleDelete() {
    deleteMutation.mutate([id]);
  }
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
      }}
    >
      <Text>{name}</Text>
      <Box>
        <Link to="/settings/set-of-fields/$id" params={{ id: String(id) }}>
          Edit
        </Link>
        <Button onClick={handleDelete}>Del</Button>
      </Box>
    </Box>
  );
}
