import { Container } from "@mantine/core";
import { ReactNode } from "react";

export function BaseContainer({ children }: { children: ReactNode }) {
  return (
    <Container p={"0 var(--mantine-spacing-xs)"} size={"md"}>
      {children}
    </Container>
  );
}
