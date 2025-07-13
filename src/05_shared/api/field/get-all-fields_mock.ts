import { http, HttpResponse } from "msw";
import { API_FIELDS, baseUrl } from "../urls";

export const getAllFieldsHandler = [
  http.get(baseUrl + "/" + API_FIELDS, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "field",
        type: "INPUT",
        options: [],
      },
      {
        id: 2,
        name: "word",
        type: "INPUT",
        options: [],
      },
      {
        id: 3,
        name: "part of speech",
        type: "SELECT",
        options: ["p", "v"],
      },
      {
        id: 4,
        name: "tag",
        type: "MULTISELECT",
        options: ["cow", "cat", "dog"],
      },
    ]);
  }),
];
