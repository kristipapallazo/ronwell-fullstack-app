import EventsNavigation from "../components/EventsNavigation.tsx";
import { Outlet } from "react-router-dom";
import classes from "./EventsRoot.module.css";
import { FC } from "react";

const EventsRoot: FC = () => {
  return (
    <div className={classes.cont}>
      <EventsNavigation />
      <main className={classes.outlet}>
        <Outlet />
      </main>
    </div>
  );
};

export default EventsRoot;
