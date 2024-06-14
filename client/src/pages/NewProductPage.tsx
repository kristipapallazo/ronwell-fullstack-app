import { FC } from "react";
import ProductForm from "../components/ProductForm";

const NewProductPage: FC = () => {
  return <ProductForm method="post" />;
};

export default NewProductPage;
