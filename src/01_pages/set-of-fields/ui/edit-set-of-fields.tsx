import { useSuspenseQuery } from "@tanstack/react-query";
import { Route } from "src/00_app/routes/settings/set-of-fields/$id";
import { SetOfFieldsForm } from ".";
import { getSetById } from "src/05_shared/api/set-of-fields/get-set-by-id";

export function EditSetOfFields() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(getSetById(Number(id)));

  return <SetOfFieldsForm initialData={data} />;
}
