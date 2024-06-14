import { LoaderFunction, redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate!);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

export const getToken = (): Token => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const tokenDuration = getTokenDuration();
  if (tokenDuration >= 0) {
    return token;
  }
  return null;
};

export const tokenLoader = (): LoaderFunction<Token> => {
  return getToken();
};

export const checkAuthLoader = () => {
  const token = getToken();

  if (!token) return redirect("/auth");
  return null;
};
