import { useRouteLoaderData } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { FC } from "react";

interface Data {
  product: Product;
}
const EditProductPage: FC = () => {
  const data = useRouteLoaderData("product-detail") as Data;

  return <ProductForm product={data.product} method="patch" />;
};

export default EditProductPage;
