// import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { useQuery } from "@tanstack/react-query";
import { baseFetch } from "..";

// const { initDataRaw } = retrieveLaunchParams();

// function saveToken(token: string) {
//   localStorage.setItem("token", token);
// }
// function getToken() {
//   localStorage.getItem("token");
// }

// export async function auth(initialData: string | undefined) {
//   const data = await baseFetch("api/auth/telegram", {
//     method: "POST",
//     headers: {
//       Authorization: `tma ${initialData}`,
//     },
//   });

//   try {
//     // return wordCardSchema.parse(data);
//     return data;
//   } catch (e) {
//     console.log(e);
//     throw e;
//   }
// }


const sendInitData = async (initData: string) => {
  console.log("sendInitData")
  const response = await baseFetch("api/auth/telegram", {
    method: "POST",
    headers: {
      Authorization: `tma ${initData}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response;
};

export const useInitData = () => {
  const initData = window.Telegram.WebApp.initData;

  return useQuery({
    queryKey: ['initData'], // Уникальный ключ для запроса
    queryFn: () => sendInitData(initData), // Функция запроса
    enabled: !!initData, // Запрос выполнится только если initData существует
    staleTime: Infinity, // Данные не устаревают
  });
};