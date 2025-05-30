import { ActionIcon, Box, Button, Text } from "@mantine/core";
import {
  IconArrowBackUp,
  IconStar,
  IconStarFilled,
  IconTrash,
} from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useDeleteSets } from "src/04_entities/set-of-fields/api/use-delete-sets";
import { SideMenu } from "src/04_entities/side-menu";
import { getAllSets } from "src/05_shared/api/set-of-fields/get-all-sets";
import { setOfFields } from "src/05_shared/api/set-of-fields/types";
import { BottomBtnGroup } from "src/05_shared/ui/block-buttons/bottom-btn-group";
import { Header } from "src/05_shared/ui/header";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { ListItemEntities } from "src/05_shared/ui/list-entities/list-item";
import { ListItemContainerEntities } from "src/05_shared/ui/list-entities/list-item-container";
import { ListWrapEntities } from "src/05_shared/ui/list-entities/list-wrap";
import { MainContainer } from "src/05_shared/ui/main-container";

import { Banner } from "src/05_shared/ui/banners/banner";
import classes from "./classes.module.css";
import { useSetDefault } from "src/04_entities/set-of-fields";
import { SETTINGS_PAGE_PATH, SETTINGS_SET_OF_FIELDS_ID_PATH, SETTINGS_SET_OF_FIELDS_PATH } from "src/05_shared/api/query-const";

export function SetsOfFields() {
  const { data } = useSuspenseQuery(getAllSets());
  const btnGroup = (
    <ActionIcon.Group>
      <ActionIcon component={Link} to={SETTINGS_PAGE_PATH}>
        <IconArrowBackUp />
      </ActionIcon>
    </ActionIcon.Group>
  );

  const sortedList = data.sort((a, b) => a.name.localeCompare(b.name));

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
            {sortedList.length === 0 && (
              <Banner>
                You don't have any sets. Try adding one using the button at the
                bottom.
              </Banner>
            )}
            {sortedList.map((set) => (
              <Card key={set.id} set={set} />
            ))}
          </ListEntities>
        </ListWrapEntities>

        <BottomBtnGroup>
          <Button component={Link} to={SETTINGS_SET_OF_FIELDS_PATH}>
            Add new set
          </Button>
        </BottomBtnGroup>
      </MainContainer>
    </>
  );
}

function Card({ set }: { set: setOfFields }) {
  const { id, name, defaultSet } = set;
  const deleteMutation = useDeleteSets();
  const setDefaultMutation = useSetDefault();

  function handleDelete() {
    deleteMutation.mutate([id]);
  }
  function handleSetDefault() {
    setDefaultMutation.mutate(id);
  }

  return (
    <ListItemEntities>
      <ListItemContainerEntities>
        <ActionIcon variant="subtle" onClick={handleSetDefault} mr={10}>
          {defaultSet ? <IconStarFilled /> : <IconStar />}
        </ActionIcon>
        <Link
          className={classes.link}
          to={SETTINGS_SET_OF_FIELDS_ID_PATH}
          params={{ id: String(id) }}
        >
          <Text>{name}</Text>
        </Link>

        <Box display={"flex"}>
          <ActionIcon type="button" onClick={handleDelete}>
            <IconTrash />
          </ActionIcon>
        </Box>
      </ListItemContainerEntities>
    </ListItemEntities>
  );
}
