import { QueryClient } from "@tanstack/react-query";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

let baseUrl = "";
if (import.meta.env.DEV) {
  baseUrl = "http://localhost:7829";
} else if (import.meta.env.PROD) {
  baseUrl = "https://flying-squirrel.duckdns.org";
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

// const initData = window.Telegram.WebApp.initData;
const { initDataRaw } = retrieveLaunchParams();

export const baseFetch = async (url: string, init?: RequestInit) => {
  try {
    const response = await fetch(baseUrl + "/" + url, {
      ...init,
      headers: {
        Authorization: `tma ${initDataRaw}`,
        // Authorization: "test abc",
        ...init?.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("An error occurred while fetching data:", error);
      throw new Error(`Fetch error: ${error.message}`);
    } else {
      throw error;
    }
  }
};
