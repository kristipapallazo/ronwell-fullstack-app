import { Await, defer, useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";
import { fetchData } from "../utils/async-req";
import { FC, Suspense } from "react";

const Loading = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>Loading...</p>
    </div>
  );
};

const EventsPage: FC = () => {
  const { eventsData } = useLoaderData();

  return (
    <>
      {/* {<EventsList events={data.events} />} */}
      <Suspense fallback={<Loading />}>
        <Await resolve={eventsData}>
          {(loadedEvents) => <EventsList events={loadedEvents.events!} />}
        </Await>
      </Suspense>
    </>
  );
};

const loadedEvents = async () => {
  return await fetchData("/events");
};
export const loader = async () => {
  return defer({
    eventsData: loadedEvents(),
  });
};
export default EventsPage;
