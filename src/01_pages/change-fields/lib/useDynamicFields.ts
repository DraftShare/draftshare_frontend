import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  DynamicField,
  FieldId,
  FieldType,
} from "src/05_shared/api/field/types";
import { getAllFields } from "src/05_shared/api/field/get-all-fields";

export function useDynamicFields() {
  const { data } = useSuspenseQuery(getAllFields());

  const [fields, setFields] = useState<DynamicField[]>(data);
  const [delFieldIds, setDelFieldIds] = useState<FieldId[]>([]);

  function handleChangeName(name: string, index: number) {
    setFields((oldData) =>
      oldData.map((item, idx) =>
        idx === index ? { ...item, name: name } : item
      )
    );
  }

  function handleChangeType(type: FieldType, index: number) {
    setFields((oldData) =>
      oldData.map((item, idx) =>
        idx === index
          ? {
              ...item,
              type,
              options:
                type === "SELECT" || type === "MULTISELECT"
                  ? (item.options ?? [""])
                  : undefined,
            }
          : item
      )
    );
  }

  function handleChangeOptions(options: string[], index: number) {
    setFields((oldData) =>
      oldData.map((item, idx) => (idx === index ? { ...item, options } : item))
    );
  }

  function handleDeleteField(index: number) {
    if (fields[index].id) {
      setDelFieldIds([...delFieldIds, fields[index].id]);
    }
    setFields((oldData) => oldData.filter((_, i) => i !== index));
  }

  function resetChanges() {
    setFields(data);
    setDelFieldIds([]);
  }

  function addEmptyField() {
    setFields((oldData) => [
      ...oldData,
      { name: "", type: "INPUT", options: [] },
    ]);
  }

  function dataToSend() {
    return { fieldsToDelete: delFieldIds, fieldsToUpsert: fields };
  }

  return {
    fields,
    handleChangeName,
    handleChangeType,
    handleChangeOptions,
    handleDeleteField,
    addEmptyField,
    dataToSend,
    resetChanges,
  };
}
