import PageContent from "./PageContent.tsx";

import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError(); //json format
  console.log("error :>> ", error);
  /*
   if is thrown a Response  it will include the status,   
   if is thrown any object error obj would be this thrown object
   */

  const title = "An error occured!";
  const message = "Something went wrong.";

  console.log("error :>> ", error);
  // try {
  //   const data = JSON.parse(error.data);
  //   if (data.message) message = data.message;
  // } catch (e) {
  //   if (error.data && typeof error.data === "string") {
  //     message = error.data;
  //   } else {
  //     if (error.message) message = error.message;
  //   }
  // }

  // if (error.status === 404) title = "Not Found";

  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
};

export default ErrorPage;
