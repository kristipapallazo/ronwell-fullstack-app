import { json, redirect } from "react-router-dom";
import { config } from "../globals/index";

const { apiUrl } = config;

export const fetchData = async (
  route = "/",
  header = {},
  message = "Failed to fetch events."
) => {
  const response = await fetch(apiUrl + route, header);

  if (!response.ok) {
    throw new Response(
      json(
        { message },
        { status: response.status, statusText: response.statusText }
      )
    );
    // throw new Response(
    //   JSON.stringify({ message: "Failed to fetch events" }, { status: 500 })
    // );
  }
  const resData = await response.json();
  return resData;
};
export const sendData = async (
  route = "/",
  header: unknown,
  msg: string,
  redirectRoute?: string
) => {
  const finalHeader = header || {};
  const message = msg || "Failed to fetch events.";
  const response = await fetch(apiUrl + route, finalHeader);

  if (response.status === 422 || response.status === 401) return response;
  if (!response.ok) {
    throw new Response(
      json(
        { message },
        { status: response.status, statusText: response.statusText }
      )
    );
    // throw new Response(
    //   JSON.stringify({ message: "Failed to fetch events" }, { status: 500 })
    // );
  }
  const data = await response.json();
  if (data?.token) {
    localStorage.setItem("token", data.token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());
  }
  if (redirectRoute) return redirect(redirectRoute);
  return null;
};
