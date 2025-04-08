import { Link, LinkProps, ReactNode } from "@tanstack/react-router";
import classes from "./classes.module.css";

interface PlainLinkProps extends LinkProps {
  children: ReactNode;
  customProp?: string;
}

export function PlainLink({ children, ...props }: PlainLinkProps) {
  return (
    <Link className={classes.link} {...props}>
      {children}
    </Link>
  );
}
