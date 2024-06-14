import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";
import { FC } from "react";

const EditEventPage: FC = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventForm event={data.event} method="patch" />;
};

export default EditEventPage;
