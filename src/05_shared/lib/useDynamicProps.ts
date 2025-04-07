import { useState } from "react";

export interface Property {
  name: string;
  value: string;
}

export type PropField = keyof Property;

export function useDynamicProps(initialData: Property[] = []) {
  const [properties, setProperties] = useState<Property[]>(initialData);

  // function setDefaultProps(defaultProps: Property[] = []) {
  //   setProperties(defaultProps);
  // }
  // function setDefaultProps(cards: cards, id: cardId | null) {
  //   if (id) setProperties(cards[id].fields);
  // }

  function handleChangeProp(
    // e: React.ChangeEvent<HTMLInputElement>,
    value: string,
    index: number,
    field: PropField
  ) {
    setProperties((oldData) =>
      oldData.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    );
  }
  function handleDeleteProp(index: number) {
    setProperties((oldData) => oldData.filter((_, i) => i !== index));
  }

  function resetProps() {
    setProperties(initialData);
  }

  function addEmptyProp() {
    setProperties((oldData) => [...oldData, { name: "", value: "" }]);
  }

  function getFields() {
    const result = properties.map((prop) => ({ name: prop.name }));
    return result;
  }

  function getProps() {
    const fields = properties.map((prop) => ({
      name: prop.name,
      value: prop.value,
    }));

    return {
      fields,
    };
  }

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
    properties,
    // setDefaultProps,
    handleChangeProp,
    handleDeleteProp,
    resetProps,
    addEmptyProp,
    getFields,
    getProps,
  };
}
