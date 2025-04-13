import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { store } from "../store";
import { setError } from "src/04_entities/error/model";

type Props = {
  children: ReactNode;
  client: QueryClient;
};

const handleQueryError = (error: unknown) => {
  let errorMessage = "Произошла неизвестная ошибка";

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  store.dispatch(setError(errorMessage));
};

export const QueryProvider = ({ client, children }: Props) => {
  // Устанавливаем глобальные настройки для всех запросов
  client.setDefaultOptions({
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: (error) => {
        handleQueryError(error);
        return false;
      },
    },
    mutations: {
      retry: false,
      throwOnError: (error) => {
        handleQueryError(error);
        return false;
      },
    },
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
