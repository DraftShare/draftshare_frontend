import { useState } from "react";
import {
  addWordCard,
  addWordCardSchema,
  updateWordCard,
  updateWordCardSchema,
  wordId,
} from "src/04_entities/word/api/types";

export interface property {
  property: string;
  value: string;
  required?: boolean;
}

export function useDynamicProps(initialProps: property[] = []) {
  const [properties, setProperties] = useState<property[]>(initialProps);
  const [initData, setInitData] = useState<property[]>(initialProps);

  function setDefaultProps(defaultProps: property[] = []) {
    setInitData(defaultProps);
    setProperties(defaultProps);
  }

  function handleChangeProp(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "property" | "value"
  ) {
    setProperties((oldData) =>
      oldData.map((item, idx) =>
        idx === index ? { ...item, [field]: e.target.value } : item
      )
    );
  }
  function handleDeleteProp(index: number) {
    setProperties((oldData) => oldData.filter((_, i) => i !== index));
  }

  function resetProps() {
    setProperties(initData);
  }

  function addEmptyProp() {
    setProperties((oldData) => [...oldData, { property: "", value: "" }]);
  }

  function getProps(operation: "add"): addWordCard;
  function getProps(operation: "update", id: wordId): updateWordCard;
  function getProps(
    operation: "add" | "update",
    id?: wordId
  ): addWordCard | updateWordCard {
    const result: { [key: string]: string } = id ? { id: id } : {};
    properties.forEach((prop) => (result[prop.property] = prop.value));

    console.log(result);
    // Валидируем результат с помощью Zod
    let validatedResult;
    if (operation === "add") {
      validatedResult = addWordCardSchema.safeParse(result);
    } else if (operation === "update") {
      validatedResult = updateWordCardSchema.safeParse(result);
    }
    if (!validatedResult || !validatedResult.success) {
      throw new Error("Invalid properties: " + validatedResult?.error.message);
    }

    return validatedResult.data;
  }

  return {
    properties,
    setDefaultProps,
    handleChangeProp,
    handleDeleteProp,
    resetProps,
    addEmptyProp,
    getProps,
  };
}
