import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.tsx";
import ProductsPage, {
  loader as ProductsLoader,
} from "../pages/ProductsPage.tsx";
import ProductDetailPage, {
  loader as ProductDetailLoader,
  action as ProductDetailAction,
} from "../pages/ProductDetailPage.tsx";
import EditProductPage from "../pages/EditProductPage.tsx";
import NewProductPage from "../pages/NewProductPage.tsx";
import ProductsRoot from "../pages/ProductsRoot.tsx";
import { action as FormActionHandler } from "../components/ProductForm.tsx";
import AuthenticationPage from "../pages/AuthenticationPage.tsx";
import { action as AuthAction } from "../components/AuthForm.tsx";
import { action as LogoutAction } from "../pages/LogoutPage.tsx";
import { checkAuthLoader, tokenLoader } from "../utils/auth.ts";
import MainPage from "../pages/MainPage";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "products",
        element: <ProductsRoot />,
        children: [
          {
            index: true,
            element: <ProductsPage />,
            loader: ProductsLoader,
          },
          {
            path: ":id",
            loader: ProductDetailLoader,
            id: "product-detail", //used when you want to run the loader from a child element (useRouteLoader())
            children: [
              {
                index: true,
                element: <ProductDetailPage />,
                action: ProductDetailAction,
              },
              {
                path: "edit",
                element: <EditProductPage />,
                action: FormActionHandler,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewProductPage />,
            action: FormActionHandler,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: AuthAction,
      },
      { path: "logout", action: LogoutAction },
    ],
    errorElement: <ErrorPage />,
  },
]);
export default router;
