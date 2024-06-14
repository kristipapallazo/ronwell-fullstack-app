import ProductsNavigation from "../components/ProductsNavigation.tsx";
import { Outlet } from "react-router-dom";
import classes from "./ProductsRoot.module.css";
import { FC } from "react";

const ProductsRoot: FC = () => {
  return (
    <div className={classes.cont}>
      <ProductsNavigation />
      <main className={classes.outlet}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProductsRoot;
