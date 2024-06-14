import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.tsx";
import EventsPage, {
  loader as EventsLoader,
} from "../pages/EventDetailPage.tsx";
import EventDetailPage, {
  loader as EventDetailLoader,
  action as EventDetailAction,
} from "../pages/EventDetailPage.tsx";
import EditEventPage from "../pages/EditEventPage.tsx";
import NewEventPage from "../pages/NewEventPage.tsx";
import EventsRoot from "../pages/EventsRoot.tsx";
import { actionHandler as FormActionHandler } from "../components/EventForm.tsx";
// import AuthenticationPage from "../pages/AuthenticationPage";
// import { action as AuthAction } from "../components/AuthForm.tsx";
import { action as LogoutAction } from "../pages/LogoutPage.tsx";
import { checkAuthLoader, tokenLoader } from "../utils/auth.ts";
import MainPage from "../pages/MainPage";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: EventsLoader,
          },
          {
            path: ":id",
            loader: EventDetailLoader,
            id: "event-detail", //used when you want to run the loader from a child element (useRouteLoader())
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: EventDetailAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: FormActionHandler,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: FormActionHandler,
            loader: checkAuthLoader,
          },
        ],
      },
      // {
      //   path: "auth",
      //   element: <AuthenticationPage />,
      //   action: AuthAction,
      // },
      { path: "logout", action: LogoutAction },
    ],
    errorElement: <ErrorPage />,
  },
]);
export default router;
