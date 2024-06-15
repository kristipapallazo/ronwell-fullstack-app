import { Link } from "react-router-dom";
import classes from "./ProductsList.module.css";
import { FC } from "react";
import Label from "./UI/Label/Label";

interface ProductsListProps {
  products: Products;
}

const ProductsList: FC<ProductsListProps> = ({ products }) => {
  console.log("products :>> ", products);

  const items = products.map(({ id, name }) => (
    <li key={id} className={classes.item}>
      <Link to={`./${id}`} relative="path">
        <div className={classes.content}>
          <h2>{name}</h2>
        </div>
      </Link>
    </li>
  ));

  return (
    <div className={classes.products}>
      <h1 className={classes.header}>All Products</h1>
      {items.length > 0 ? <ul className={classes.list}>{items}</ul> : <Label />}
    </div>
  );
};

export default ProductsList;
