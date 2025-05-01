// query keys
export const SET_OF_FIELDS_KEY = "set-of-fields";
export const CARDS_KEY = "cards";
export const FIELDS_KEY = "fields";

export const ROUTES = {
  HOME: "/",
  ADD_CARD: "/add-card",
  CARD_INFO: "/card-info",
  SETTINGS: "/settings",
  CHANGE_FIELDS: "/settings/change-fields",
  SETS_OF_FIELDS: "/settings/sets-of-fields",
  SET_OF_FIELDS: "/settings/set-of-fields",
  SET_OF_FIELDS_BY_ID: "/settings/set-of-fields/$id",
} as const;

type RouteKeys = keyof typeof ROUTES;
export type AppRoutes = (typeof ROUTES)[RouteKeys];
