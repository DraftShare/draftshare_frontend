import { Box, Button, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getAll } from "src/01_pages/set-of-fields/api";
import { SetId } from "src/01_pages/set-of-fields/api/types";
import { useDeleteSets } from "src/01_pages/set-of-fields/api/use-delete-sets";
import { Field } from "src/01_pages/settings-change-properties/api/types";
import { SideMenu } from "src/04_entities/side-menu";
import { Header } from "src/05_shared/ui/header";

export function SetsOfFields() {
  const { data } = useSuspenseQuery(getAll());

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
