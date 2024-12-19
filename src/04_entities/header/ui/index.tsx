import { Burger, Container } from "@mantine/core";
import classes from "./style.module.css";
import { useDisclosure } from "@mantine/hooks";
// import { useState } from "react";

// const links = [
//   { link: "/about", label: "Features" },
//   { link: "/pricing", label: "Pricing" },
//   { link: "/learn", label: "Learn" },
//   { link: "/community", label: "Community" },
// ];
export function Header({ addIcon }: { addIcon: JSX.Element }) {
  const [opened, { toggle }] = useDisclosure(false);
  // const [active, setActive] = useState(links[0].link);

  // const items = links.map((link) => (
  //   <a
  //     key={link.label}
  //     href={link.link}
  //     className={classes.link}
  //     data-active={active === link.link || undefined}
  //     onClick={(event) => {
  //       event.preventDefault();
  //       setActive(link.link);
  //     }}
  //   >
  //     {link.label}
  //   </a>
  // ));
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <Group gap={5} visibleFrom="xs">
          {items}
        </Group> */}

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        {addIcon}
      </Container>
    </header>
  );
}
