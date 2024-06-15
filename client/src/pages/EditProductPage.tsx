import { useRouteLoaderData } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { FC } from "react";

const EditProductPage: FC = () => {
  const product = useRouteLoaderData("product-detail") as Product;

  return <ProductForm product={product} method="patch" />;
};

export default EditProductPage;
