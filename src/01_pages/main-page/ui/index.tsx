import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WordCard } from "src/04_entities/card";
import { MainPageHeader } from "src/04_entities/main-page-header";
import { getAllCards } from "src/05_shared/api/card/get-all-cards";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { MainContainer } from "src/05_shared/ui/main-container";

export function MainPage() {
  const { data } = useSuspenseQuery(getAllCards());
  const [searchTerm, setSearchTerm] = useState("");

  // const filteredData = Object.values(data).filter((card) =>
  //   card.word.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredData = Object.values(data).filter((card) => card.id);

  const listCards = filteredData.map((card, index) => (
    <WordCard key={index} card={card} />
  ));

  return (
    <>
      <MainPageHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MainContainer>
        <ListEntities>{listCards}</ListEntities>
      </MainContainer>
    </>
  );
}
