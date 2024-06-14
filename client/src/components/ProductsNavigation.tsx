import { NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./ProductsNavigation.module.css";
import { FC } from "react";

const INITIAL = [
  { id: "products", title: "All products", path: "/products" },
  {
    id: "new_product",
    title: "New product",
    path: "/products/new",
    hasAuth: true,
  },
];
const ProductsNavigation: FC = () => {
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

export default ProductsNavigation;
