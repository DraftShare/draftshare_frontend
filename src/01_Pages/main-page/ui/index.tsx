import { AddWordIcon } from "src/03_features";
import { Header } from "src/04_entities/header/ui";

export function MainPage() {
  return (
    <>
      <Header addIcon={<AddWordIcon />}/>
    </>
  );
}
