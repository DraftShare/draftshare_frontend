import { http, HttpResponse } from "msw";
import { API_CARDS, baseUrl } from "../urls";

export const getAllCardsHandler = [
  http.get(baseUrl + "/" + API_CARDS, () => {
    return HttpResponse.json({
      "1": {
        id: 1,
        fields: [
          {
            id: 1,
            name: "field",
            type: "TEXT",
            value: ["one"],
          },
          {
            id: 2,
            name: "word",
            type: "TEXT",
            value: ["two"],
          },
        ],
      },
    });
  }),
];
