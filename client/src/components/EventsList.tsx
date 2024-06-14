import { Link } from "react-router-dom";
import classes from "./EventsList.module.css";
import { FC } from "react";

interface EventsListProps {
  events: Products;
}

const EventsList: FC<EventsListProps> = ({ events }) => {
  return (
    <div className={classes.events}>
      <h1 className={classes.header}>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`./${event.id}`} relative="path">
              <div className={classes.content}>
                <h2>{event.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
