import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WordCard } from "src/04_entities/card";
import { MainPageHeader } from "src/04_entities/main-page-header";
import { getAllCards } from "src/05_shared/api/card/get-all-cards";
import { Banner } from "src/05_shared/ui/banners/banner";
import { ListEntities } from "src/05_shared/ui/list-entities/list";
import { Main } from "src/05_shared/ui/main";
import { BaseContainer } from "src/05_shared/ui/main-container";

export function MainPage() {
  const { data: cards } = useSuspenseQuery(getAllCards());
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = Object.values(cards).filter((card) => {
    const firstThreeFields = card.fields.slice(0, 3);

    return firstThreeFields.some(
      (field) =>
        field.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const listCards = filteredData.map((card, index) => (
    <WordCard key={index} card={card} />
  ));

  return (
    <>
      <MainPageHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Main>
        <BaseContainer>
          {listCards.length === 0 && (
            <Banner>
              You don't have any created cards at the moment. You can create the
              first card by clicking on the "Plus" icon in the upper-right
              corner.
            </Banner>
          )}
          <ListEntities>{listCards}</ListEntities>
        </BaseContainer>
      </Main>
    </>
  );
}
