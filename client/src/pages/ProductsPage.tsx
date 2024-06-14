import { Await, defer, useLoaderData } from "react-router-dom";

import ProductsList from "../components/ProductsList";
import { fetchData } from "../utils/async-req";
import { FC, Suspense } from "react";
import Loading from "../components/UI/Loading/Loading";

interface Data {
  productsData: Products;
}
const ProductsPage: FC = () => {
  const { productsData } = useLoaderData() as Data;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={productsData}>
          {(loadedProducts) => {
            return <ProductsList products={loadedProducts} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};

const loadedProducts = async () => {
  return await fetchData("/products");
};

export const loader = async () => {
  return defer({
    productsData: loadedProducts(),
  });
};
export default ProductsPage;
