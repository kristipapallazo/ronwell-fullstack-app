// import {
//   Form,
//   Link,
//   useActionData,
//   useNavigation,
//   useSearchParams,
// } from "react-router-dom";

// import classes from "./AuthForm.module.css";
// import { sendData } from "../utils/async-req.ts";
// import { useEffect, useMemo, useState } from "react";
// import FormItem from "./UI/Input/FormItem";
// import ErrorLabel from "./UI/Error/ErrorLabels";

// const FORM_ITEMS = [
//   {
//     id: "email",
//     label: "Email",
//     type: "email",
//   },
//   {
//     id: "password",
//     label: "Password",
//     type: "password",
//   },
// ];

// function AuthForm() {
//   const [searchedParams, setSearchParams] = useSearchParams();
//   const [isInitial, setIsInitial] = useState(true);

//   const data = useActionData();
//   const navigation = useNavigation();
//   const { state } = navigation;

//   const isSubmitting = state === "submitting" ? true : false;

//   const errors = useMemo(() => data?.errors, [data]);

//   const isLogin = searchedParams.get("mode") === "login";

//   const items = FORM_ITEMS.map((item) => {
//     const { id } = item;
//     const error = errors?.[id];
//     return <FormItem key={id} item={item} error={error} />;
//   });

//   useEffect(() => {
//     if (isInitial) {
//       setSearchParams({ mode: "login" });
//       setIsInitial(false);
//     }
//   }, [setSearchParams, isInitial]);

//   return (
//     <>
//       <ErrorLabel msg={data?.message} />
//       <Form method="post" className={classes.form}>
//         <h1 className={classes.title}>
//           {isLogin ? "Log in" : "Create a new user"}
//         </h1>
//         {items}
//         <div className={classes.actions}>
//           <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
//             {isLogin ? "Create new user" : "Login"}
//           </Link>
//           <button disabled={isSubmitting}>
//             {isSubmitting ? "Submiting ..." : "Submit"}
//           </button>
//         </div>
//       </Form>
//     </>
//   );
// }

// export default AuthForm;

// export const action = async ({ request }) => {
//   const data = await request.formData();
//   const searchParamsObj = new URL(request.url).searchParams;
//   const mode = searchParamsObj.get("mode");

//   const body = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };

//   const route = `/${mode}`;
//   return sendData(
//     route,
//     {
//       method: request.method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     },
//     "Failed to login.",
//     "/"
//   );
// };
