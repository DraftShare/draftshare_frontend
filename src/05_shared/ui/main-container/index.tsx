import { Container } from "@mantine/core";
import { ReactNode } from "react";

export function MainContainer({ children }: { children: ReactNode }) {
  return (
    <Container p={"var(--mantine-spacing-xs)"} size={"md"}>
      {children}
    </Container>
  );
}
