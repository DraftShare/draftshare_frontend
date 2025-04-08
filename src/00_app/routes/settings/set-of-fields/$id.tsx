import { createFileRoute } from "@tanstack/react-router";
import { EditSetOfFields } from "src/01_pages/set-of-fields/ui/edit-set-of-fields";

export const Route = createFileRoute("/settings/set-of-fields/$id")({
  component: EditSetOfFields,
  // loader: ({ params }) =>
  //   queryClient.ensureQueryData({
  //     queryKey: [SET_OF_FIELDS_KEY, params.id],
  //     queryFn: () => getById(Number(params.id)),
  //   }),
});
