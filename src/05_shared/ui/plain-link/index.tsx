import { Link, LinkProps, ReactNode } from "@tanstack/react-router";
import classes from "./classes.module.css";
import { clsx } from "clsx";

interface PlainLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  customProp?: string;
}

export function PlainLink({ children, className, ...props }: PlainLinkProps) {
  return (
    <Link className={clsx(classes.link, className)} {...props}>
      {children}
    </Link>
  );
}
