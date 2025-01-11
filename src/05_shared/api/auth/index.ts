// import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { baseFetch } from "..";

// const { initDataRaw } = retrieveLaunchParams();

// function saveToken(token: string) {
//   localStorage.setItem("token", token);
// }
// function getToken() {
//   localStorage.getItem("token");
// }

export async function auth(initialData: string | undefined) {
  const data = await baseFetch("api/auth/telegram", {
    method: "POST",
    headers: {
      Authorization: `tma ${initialData}`,
    },
  });

  try {
    // return wordCardSchema.parse(data);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}


