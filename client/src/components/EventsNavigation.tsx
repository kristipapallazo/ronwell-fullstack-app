import { NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./EventsNavigation.module.css";
import { FC } from "react";

const INITIAL = [
  { id: "events", title: "All events", path: "/events" },
  { id: "new_event", title: "New event", path: "/events/new", hasAuth: true },
];
const EventsNavigation: FC = () => {
  const token = useRouteLoaderData("root");

  const filteredItems = !token
    ? INITIAL.filter(({ hasAuth }) => !hasAuth)
    : INITIAL;

  const items = filteredItems.map(({ id, title, path }) => (
    <NavLink
      key={id}
      to={path}
      className={({ isActive }) => (isActive ? classes.active : "")}
      end
    >
      {title}
    </NavLink>
  ));
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>{items}</ul>
      </nav>
    </header>
  );
};

export default EventsNavigation;
