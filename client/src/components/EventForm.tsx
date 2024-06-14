import { FC, useMemo } from "react";
import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  FetcherFormProps,
} from "react-router-dom";
import { sendData } from "../utils/async-req";
import classes from "./EventForm.module.css";
import FormItem from "./UI/Input/FormItem";
import ErrorLabel from "./UI/Error/ErrorLabels";
import { getToken } from "../utils/auth";

const FORM_ITEMS = [
  {
    id: "title",
    label: "Title",
  },
  {
    id: "image",
    label: "Image",
    type: "url",
  },
  {
    id: "date",
    label: "Date",
    type: "date",
  },
  {
    id: "description",
    label: "Description",
    type: "textarea",
  },
];

interface EventFormProps {
  method: string;
}
const EventForm: FC<EventFormProps> = ({ method, event }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const data = useActionData();

  const errors = useMemo(() => data?.errors, [data]);

  const isSubmitting = navigation.state === "submitting" ? true : false;
  const isLoading = navigation.state === "loading" ? true : false;

  function cancelHandler() {
    navigate(-1);
  }

  const items = FORM_ITEMS.map((item) => {
    const { id } = item;
    const defaultValue = id === "image" ? URL : event?.[id] || "";
    const error = errors?.[id];
    return (
      <FormItem
        key={id}
        item={item}
        defaultValue={defaultValue}
        error={error}
      />
    );
  });
  if (isLoading) return <div>loading ...</div>;
  return (
    <>
      {/* action => attribute of Form element if you want to trigger an action of
      another route add action attribute with the route of that action as value
      ex. action='/products' */}
      <ErrorLabel msg={data?.message} />
      <Form method={method} className={classes.form}>
        {items}
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default EventForm;

export const actionHandler = async ({ request, params }) => {
  const data = await request.formData();

  const body = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const token = getToken();
  const reqRoute =
    request.method === "POST" ? "/products" : `/products/${params.id}`;
  return await sendData(
    reqRoute, // /products/:id || /products
    {
      method: request.method, // patch || post
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    "Failed to send form data!",
    "/products"
  );
};
