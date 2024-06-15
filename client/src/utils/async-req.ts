import { redirect /* json */ } from "react-router-dom";
import { config } from "../globals/index";

const { apiUrl } = config;

export const fetchData = async (
  route = "/",
  header: RequestInit = {},
  message = "Failed to fetch products."
) => {
  const res: Response = await fetch(apiUrl + route, header);
  console.log("res :>> ", res);

  if (!res.ok) {
    // throw new Response(
    //   json(
    //     { message },
    //     { status: response.status, statusText: response.statusText }
    //   )
    // );
    throw new Response(JSON.stringify({ message, status: 500 }));
  }
  const resData = await res.json();
  console.log("resData :>> ", resData);
  return resData;
};
export const sendData = async (
  route = "/",
  header: RequestInit,
  message: string = "Failed to send products.",
  redirectRoute?: string
) => {
  try {
    const finalHeader = header || {};
    const response = await fetch(apiUrl + route, finalHeader);

    if (response.status === 422 || response.status === 401) return response;
    if (!response.ok) {
      // throw new Response(
      //   json(
      //     { message },
      //     { status: response.status, statusText: response.statusText }
      //   )
      // );
      throw new Response(JSON.stringify({ message, status: 500 }));
    }
    console.log("response :>> ", response);
    const data = await response.json();
    console.log("data :>> ", data);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());
    }
    if (redirectRoute) return redirect(redirectRoute);
    return null;
  } catch (error) {
    const e = error as Error;
    console.log("e :>> ", e);
    return null;
  }
};
