import { useState } from "react";
import { FieldId, FieldType } from "src/05_shared/api/field/types";
import { getAllFields } from "../api/field/get-all-fields";
import { useSuspenseQuery } from "@tanstack/react-query";
import { field } from "../api/card/types";

export function useDynamicFields(data: field[] = []) {
  const { data: fields } = useSuspenseQuery(getAllFields());
  const [dynamicFields, setDynamicFields] = useState<field[]>(data);
  const [delFieldIds, setDelFieldIds] = useState<FieldId[]>([]);

  function handleChangeName(name: string, index: number) {
    // const field = fields.find((field) => field.name === name);
    // if (field) {
    //   setDynamicFields((oldData) =>
    //     oldData.map((item, idx) =>
    //       idx === index
    //         ? {
    //             ...item,
    //             name: name,
    //             type: field.type,
    //             options: field.options,
    //           }
    //         : item
    //     )
    //   );
    // } else {
    //   setDynamicFields((oldData) =>
    //     oldData.map((item, idx) =>
    //       idx === index ? { ...item, name: name, options: [] } : item
    //     )
    //   );
    // }
    setDynamicFields((oldData) =>
      oldData.map((item, idx) =>
        idx === index ? { ...item, name: name } : item
      )
    );
  }
  function handleChangeValue(value: string | string[], index: number) {
    setDynamicFields((oldData) =>
      oldData.map((item, idx) =>
        idx === index
          ? { ...item, value: Array.isArray(value) ? value : [value] }
          : item
      )
    );
  }

  function handleChangeType(type: FieldType, index: number) {
    const field = fields.find(
      (field) => field.name === dynamicFields[index].name && field.type === type
    );

    setDynamicFields((oldData) =>
      oldData.map((item, idx) =>
        idx === index
          ? {
              ...item,
              type,
              options: field?.options ?? [],
            }
          : item
      )
    );
  }

  function handleChangeOptions(options: string[], index: number) {
    setDynamicFields((oldData) =>
      oldData.map((item, idx) => (idx === index ? { ...item, options } : item))
    );
  }

  function handleDeleteField(index: number) {
    if (dynamicFields[index].id) {
      setDelFieldIds([...delFieldIds, dynamicFields[index].id]);
    }
    setDynamicFields((oldData) => oldData.filter((_, i) => i !== index));
  }

  function resetChanges() {
    setDynamicFields(data);
    setDelFieldIds([]);
  }

  function addEmptyField() {
    setDynamicFields((oldData) => [
      ...oldData,
      { name: "", type: "TEXT", options: [], value: [] },
    ]);
  }

  function dataToSend() {
    return { fieldsToDelete: delFieldIds, fieldsToUpsert: dynamicFields };
  }

  return {
    fields: dynamicFields,
    handleChangeName,
    handleChangeValue,
    handleChangeType,
    handleChangeOptions,
    handleDeleteField,
    addEmptyField,
    dataToSend,
    resetChanges,
  };
}
