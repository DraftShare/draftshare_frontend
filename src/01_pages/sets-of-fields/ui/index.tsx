import { ActionIcon, Box, Button, Text } from "@mantine/core";
import { IconArrowBackUp, IconTrash } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useDeleteSets } from "src/04_entities/set-of-fields/api/use-delete-sets";
import { SideMenu } from "src/04_entities/side-menu";
import { Field } from "src/05_shared/api/field/types";
import { getAllSets } from "src/05_shared/api/set-of-fields/get-all-sets";
import { SetId } from "src/05_shared/api/set-of-fields/types";
import { BottomBtnGroup } from "src/05_shared/ui/block-buttons/bottom-btn-group";
import { Header } from "src/05_shared/ui/header";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { ListItemEntities } from "src/05_shared/ui/list-entities/list-item";
import { ListItemContainerEntities } from "src/05_shared/ui/list-entities/list-item-container";
import { ListWrapEntities } from "src/05_shared/ui/list-entities/list-wrap";
import { MainContainer } from "src/05_shared/ui/main-container";
import { PlainLink } from "src/05_shared/ui/plain-link";

export function SetsOfFields() {
  const { data } = useSuspenseQuery(getAllSets());
  const btnGroup = (
    <ActionIcon.Group>
      <ActionIcon component={Link} to="/settings-page">
        <IconArrowBackUp />
      </ActionIcon>
    </ActionIcon.Group>
  );
  return (
    <>
      <Header
        title="Change field sets"
        menu={<SideMenu />}
        btnGroup={btnGroup}
      />
      <MainContainer>
        <ListWrapEntities>
          <ListEntities>
            {data.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                fields={item.fields}
              />
            ))}
          </ListEntities>
        </ListWrapEntities>

        <BottomBtnGroup>
          <Button component={Link} to="/settings/set-of-fields">
            Add new set
          </Button>
        </BottomBtnGroup>
      </MainContainer>
    </>
  );
}

function Card({ id, name }: { id: SetId; name: string; fields: Field[] }) {
  const deleteMutation = useDeleteSets();

  function handleDelete() {
    deleteMutation.mutate([id]);
  }
  return (
    <ListItemEntities>
      <PlainLink to="/settings/set-of-fields/$id" params={{ id: String(id) }}>
        <ListItemContainerEntities>
          <Text>{name}</Text>
          <Box display={"flex"}>
            <ActionIcon type="button" onClick={handleDelete}>
              <IconTrash />
            </ActionIcon>
          </Box>
        </ListItemContainerEntities>
      </PlainLink>
    </ListItemEntities>
  );
}
