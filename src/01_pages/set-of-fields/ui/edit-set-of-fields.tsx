import { useSuspenseQuery } from "@tanstack/react-query";
import { Route } from "src/routes/settings/set-of-fields/$id";
import { getById } from "../api";
import { SetOfFieldsForm } from ".";

export function EditSetOfFields() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(getById(Number(id)));

  return <SetOfFieldsForm initialData={data} />;
}
