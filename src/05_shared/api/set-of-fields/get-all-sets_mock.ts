import { http, HttpResponse } from "msw";
import { API_SET_OF_FIELDS, baseUrl } from "../urls";

export const getAllSetsHandler = [
  http.get(baseUrl + "/" + API_SET_OF_FIELDS, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "firstSet",
        fields: [{ id: 1, name: "field", type: "TEXT", options: []}],
        defaultSet: false,
      },
    ]);
  }),
];
