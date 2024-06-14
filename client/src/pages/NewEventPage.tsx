import { FC } from "react";
import EventForm from "../components/EventForm";

const NewEventPage: FC = () => {
  return <EventForm method="post" />;
};

export default NewEventPage;
