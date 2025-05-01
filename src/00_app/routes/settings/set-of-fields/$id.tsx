import { createFileRoute } from "@tanstack/react-router";
import { EditSetOfFields } from "src/01_pages/set-of-fields/ui/edit-set-of-fields";
import { ROUTES } from "src/05_shared/api/query-const";

export const Route = createFileRoute(`${ROUTES.SET_OF_FIELDS}/`)({
  component: EditSetOfFields,
  // loader: ({ params }) =>
  //   queryClient.ensureQueryData({
  //     queryKey: [SET_OF_FIELDS_KEY, params.id],
  //     queryFn: () => getById(Number(params.id)),
  //   }),
});
