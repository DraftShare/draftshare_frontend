import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DynamicField, FieldId } from "../../../05_shared/api/field/types";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";

export function useDynamicFields() {
  const { data } = useSuspenseQuery(getAllFields());

  const [fields, setFields] = useState<DynamicField[]>(data);
  const [delFieldIds, setDelFieldIds] = useState<FieldId[]>([]);

  function handleChangeField(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setFields((oldData) =>
      oldData.map((item, idx) =>
        idx === index ? { ...item, name: e.target.value } : item
      )
    );
  }
  function handleDeleteField(index: number) {
    if (fields[index].id) {
      setDelFieldIds([...delFieldIds, fields[index].id]);
    }
    setFields((oldData) => oldData.filter((_, i) => i !== index));
  }

  // function resetStore() {
  //   setFields(existingFields);
  //   setDelFieldIds([]);
  // }

  function addEmptyField() {
    setFields((oldData) => [...oldData, { name: "" }]);
  }

  function dataToSend() {
    return { fieldsToDelete: delFieldIds, fieldsToUpsert: fields };
  }

  return {
    fields,
    handleChangeField,
    handleDeleteField,
    addEmptyField,
    dataToSend,
    // resetStore,
  };
}
