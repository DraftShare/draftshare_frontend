import { createFileRoute } from "@tanstack/react-router"
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { baseFetch } from "src/05_shared/api";

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    console.log("/_authenticated")
    const token = localStorage.getItem("token");

    if (!token) {
      // Попробуем аутентифицировать пользователя через initDataRaw
      const { initDataRaw } = retrieveLaunchParams();
      if (!initDataRaw) {
        throw new Error("No token or initDataRaw available for authentication.");
      }
      const response = await baseFetch("api/auth/telegram", {
        method: "POST",
        headers: {
          Authorization: `tma ${initDataRaw}`,
        },
      });

      if (!response.ok) {
        // router.navigate({ to: "/error" }); // Перенаправление при ошибке
        throw new Error("Authentication failed.");
      }

      const { token: newToken } = await response.json();
      localStorage.setItem("token", newToken);
    }

    // if (!isAuthenticated()) {
    //   throw redirect({
    //     to: '/login',
    //     search: {
    //       // Use the current location to power a redirect after login
    //       // (Do not use `router.state.resolvedLocation` as it can
    //       // potentially lag behind the actual current location)
    //       redirect: location.href,
    //     },
    //   })
    // }
  },
})