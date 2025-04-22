import { createFileRoute } from "@tanstack/react-router";
import { EditSetOfFields } from "src/01_pages/set-of-fields/ui/edit-set-of-fields";
import { SETTINGS_SET_OF_FIELDS_ID_PATH } from "src/05_shared/api/query-const";

export const Route = createFileRoute(SETTINGS_SET_OF_FIELDS_ID_PATH)({
  component: EditSetOfFields,
  // loader: ({ params }) =>
  //   queryClient.ensureQueryData({
  //     queryKey: [SET_OF_FIELDS_KEY, params.id],
  //     queryFn: () => getById(Number(params.id)),
  //   }),
});
