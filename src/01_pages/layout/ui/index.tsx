import { Container } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import { Header } from "src/05_shared/ui/header";

export function Layout() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
