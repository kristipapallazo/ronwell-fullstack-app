import { Form, NavLink, useRouteLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import classes from "./MainNavigation.module.css";
import { getTokenDuration } from "../utils/auth";

type Item = {
  id: string;
  title: string;
  path: string;
  end?: boolean;
  notAuth?: boolean;
};
type Items = Item[];

const INITIAL: Items = [
  { id: "home", title: "Home", path: "/", end: true },
  { id: "products", title: "Products", path: "/products" },
  { id: "auth", title: "Auth", path: "/auth", notAuth: true },
];
function MainNavigation() {
  const token = useRouteLoaderData("root") as Token;
  const submit = useSubmit();

  useEffect(() => {
    if (!token) return;
    const tokenDuration = getTokenDuration();
    console.log("tokenDuration :>> ", tokenDuration);
    setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, tokenDuration);
  }, [token, submit]);

  const filteredItems = token
    ? INITIAL.filter(({ notAuth }: Item) => !notAuth)
    : INITIAL;

  const items = filteredItems.map(({ id, title, path, end }) => (
    <NavLink
      key={id}
      to={path}
      className={({ isActive }) => (isActive ? classes.active : "")}
      end={end}
    >
      {title}
    </NavLink>
  ));

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {items}
          {token && (
            <li>
              <Form method="post" action="/logout">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
