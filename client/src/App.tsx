import "./index.css";
import "./App.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { FC } from "react";

const App: FC = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
