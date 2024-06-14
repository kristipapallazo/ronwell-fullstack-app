import EventItem from "../components/EventItem";
import { useRouteLoaderData } from "react-router-dom";
import { fetchData, sendData } from "../utils/async-req";
import { getToken } from "../utils/auth";
import { FC } from "react";

const EventDetailPage: FC = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  return await fetchData(
    `/events/${params.id}`,
    {},
    "Could not fetch details for the selected event."
  );
};

export const action = async ({ request, params }) => {
  const token = getToken();
  return await sendData(
    `/events/${params.id}`,
    {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    `Failed to delete event with id '${params.id}'`,
    "/events"
  );
};
