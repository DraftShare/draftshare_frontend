import { useAppDispatch } from "src/05_shared/redux";
import { setError } from "./model";

export const useErrorHandler = () => {
  const dispatch = useAppDispatch();

  return (error: unknown) => {
    let errorMessage = "Произошла неизвестная ошибка";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    dispatch(setError(errorMessage));
  };
};
