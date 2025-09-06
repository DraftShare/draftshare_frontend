import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import classes from "./classes.module.css";

export function Layout() {
  return (
    <div className={classes["container"]}>
      <div className={classes["content"]}>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </div>
  );
}
