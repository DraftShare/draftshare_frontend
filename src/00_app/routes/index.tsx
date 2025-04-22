import { createFileRoute } from "@tanstack/react-router";
// import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { MainPage } from "src/01_pages/main-page";
import { ROOT_PATH } from "src/05_shared/api/query-const";
// import { baseFetch } from "src/05_shared/api";

export const Route = createFileRoute(ROOT_PATH)({
  // beforeLoad: async () => {
  //   const token = localStorage.getItem("token");
  //   console.log('hi')

  //   if (!token) {
  //     // Попробуем аутентифицировать пользователя через initDataRaw
  //     const { initDataRaw } = retrieveLaunchParams();
  //     if (!initDataRaw) {
  //       throw new Error(
  //         "No token or initDataRaw available for authentication."
  //       );
  //     }
  //     console.log(initDataRaw)
  //     const response = await baseFetch("api/auth/telegram", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `tma ${initDataRaw}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       // router.navigate({ to: "/error" }); // Перенаправление при ошибке
  //       throw new Error("Authentication failed.");
  //     }

  //     const { token: newToken } = await response.json();
  //     localStorage.setItem("token", newToken);
  //   }
  // },
  component: MainPage,
});
