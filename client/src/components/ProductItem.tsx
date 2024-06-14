import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./ProductItem.module.css";
import { FC } from "react";

interface ProductItemProps {
  product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const submit = useSubmit();
  const tokenRes = useRouteLoaderData("root");

  const { name, description, price, inventory } = product;

  const token: Token =
    tokenRes && typeof tokenRes === "string" ? tokenRes : undefined;

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure you want to delete?");

    if (proceed) {
      submit(null, { method: "delete" });
      // submit(data_to_send, request_header)
    }
  }
  const formattedPrice = Number(price).toFixed(2);

  return (
    <article className={classes.product}>
      <h1 className={classes.name}>{name}</h1>
      <p className={classes.desc}>{description}</p>
      <p>
        <span className={classes.label}>Price:</span>
        <span className={classes.curr}>$</span>
        <span className={classes.price}>{formattedPrice}</span>
      </p>
      <p>
        <span className={classes.label}>Inventory:</span>
        <span>{inventory}</span>
      </p>
      {token && (
        <menu className={classes.actions}>
          <Link
            to="edit"
            relative="path"
            className={`${classes.btn} ${classes.edit}`}
          >
            Edit
          </Link>
          <button
            onClick={() => startDeleteHandler(/* product.id */)}
            className={`${classes.btn} ${classes.delete}`}
          >
            Delete
          </button>
        </menu>
      )}
    </article>
  );
};

export default ProductItem;
