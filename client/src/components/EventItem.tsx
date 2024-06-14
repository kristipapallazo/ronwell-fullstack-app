import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";
import { FC } from "react";

interface EventItemProps {
  event: Product;
}
const EventItem: FC<EventItemProps> = ({ event }) => {
  const submit = useSubmit();
  const tokenRes = useRouteLoaderData("root");

  const token: Token =
    tokenRes && typeof tokenRes === "string" ? tokenRes : undefined;

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure you want to delete?");

    if (proceed) {
      submit(null, { method: "delete" });
      // submit(data_to_send, request_header)
    }
  }

  return (
    <article className={classes.event}>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit" relative="path">
            Edit
          </Link>
          <button onClick={() => startDeleteHandler(/* event.id */)}>
            Delete
          </button>
        </menu>
      )}
    </article>
  );
};

export default EventItem;
