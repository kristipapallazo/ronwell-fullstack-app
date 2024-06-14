import ProductItem from "../components/ProductItem";
import {
  ActionFunction,
  LoaderFunction,
  useRouteLoaderData,
} from "react-router-dom";
import { fetchData, sendData } from "../utils/async-req";
import { getToken } from "../utils/auth";
import { FC } from "react";

// interface Data {
//   product: Product;
// }

const ProductDetailPage: FC = () => {
  const product = useRouteLoaderData("product-detail") as Product;

  return <ProductItem product={product} />;
};

export default ProductDetailPage;

export const loader: LoaderFunction = async ({ params }) => {
  return await fetchData(
    `/products/${params.id}`,
    {},
    "Could not fetch details for the selected product."
  );
};

export const action: ActionFunction = async ({ request, params }) => {
  const token = getToken();
  return await sendData(
    `/products/${params.id}`,
    {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    `Failed to delete product with id '${params.id}'`,
    "/products"
  );
};
