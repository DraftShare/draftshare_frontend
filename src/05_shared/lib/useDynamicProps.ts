import { useCallback, useState } from "react";

interface Field {
  name: string;
  value: string;
}

export function useDynamicFields(initialData: Field[] = []) {
  const [fields, setFields] = useState<Field[]>(initialData);

  const handleFieldUpdate = useCallback(
    (index: number, name: string, value: string) => {
      setFields((prev) => {
        const newFields = [...prev];
        newFields[index] = { name, value };
        return newFields;
      });
    },
    []
  );

  const handleFieldDelete = useCallback((index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  }, []);

  function resetFields() {
    setFields(initialData);
  }

  function addEmptyField() {
    setFields((prev) => [...prev, { name: "", value: "" }]);
  }

  // function getFields() {
  //   const result = fields.map((prop) => ({ name: prop.name }));
  //   return result;
  // }

  // function getProps() {
  //   const result = fields.map((field) => ({
  //     name: field.name,
  //     value: field.value,
  //   }));

  //   return {
  //     fields: result,
  //   };
  // }

  // function getProps(operation: "add"): addWordCard;
  // function getProps(operation: "update", id: cardId): wordCard;
  // function getProps(
  //   operation: "add" | "update",
  //   id?: cardId
  // ): addWordCard | wordCard {
  //   // const result: { [key: string]: string } = id ? { id: id } : {};
  //   // const result: addWordCard = {word: word, properties: properties}
  //   // const result: wordCard = {_id: id, word: word, properties: properties}
  //   // properties.forEach((prop) => (result[prop.property] = prop.value));

  //   let result: addWordCard | wordCard;

  //   if (operation === "add") {
  //     result = { properties: properties };
  //   } else if (operation === "update" && id) {
  //     result = { _id: id, properties: properties };
  //   } else {
  //     throw new Error("Invalid operation or missing id for update");
  //   }

  //   console.log(result);
  //   // Валидируем результат с помощью Zod
  //   let validatedResult;
  //   if (operation === "add") {
  //     validatedResult = addCardSchema.safeParse(result);
  //   } else if (operation === "update") {
  //     validatedResult = updateCardSchema.safeParse(result);
  //   }
  //   if (!validatedResult || !validatedResult.success) {
  //     throw new Error("Invalid properties: " + validatedResult?.error.message);
  //   }

  //   return validatedResult.data;
  // }

  return {
    dynamicFields: fields,
    handleFieldUpdate,
    handleFieldDelete,
    resetDynamicFields: resetFields,
    addEmptyField,
    // getFields,
    // getProps,
  };
}
