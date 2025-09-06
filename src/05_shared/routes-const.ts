export const ROUTES = {
  LOGIN: "/login",
  PROFILE: "/profile",

  //collections
  LIST_OF_COLLECTIONS: "/collections/",
  LIST_OF_CARDS: "/collections/$collectionId",

  //cards
  LIST_OF_ALL_CARDS: "/cards/",
  CARD_INFO: "/cards/$cardId",
  ADD_CARD: "/cards/add-card",

  //settings
  SETTINGS: "/settings/",
  LIST_OF_FIELDS: "/settings/fields",
  LIST_OF_FIELD_SETS: "/settings/field-sets",
  EDIT_FIELD_SET: "/settings/field-sets/$fieldSetId",
} as const;

type RouteKeys = keyof typeof ROUTES;
export type AppRoutes = (typeof ROUTES)[RouteKeys];
