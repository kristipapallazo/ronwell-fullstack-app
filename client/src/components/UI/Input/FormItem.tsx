import { FC } from "react";
import classes from "./FormItem.module.css";

interface Item {
  id: string;
  name: string;
  label: string;
  required: boolean;
  type?: string;
}
interface FormItemProps {
  defaultValue?: string;
  item: Item;
  error: object;
  required?: boolean;
}

const FormItem: FC<FormItemProps> = ({
  item,
  defaultValue = undefined,
  error,
}) => {
  const { id, name, label, type = "text", required = false } = item;
  return (
    <p className={classes.section}>
      <label htmlFor={id}>{label}</label>
      {type !== "textarea" ? (
        <input
          id={id}
          type={type}
          name={name || id}
          required={required}
          defaultValue={defaultValue}
          className={error ? classes.invalidInput : ""}
        />
      ) : (
        <textarea
          id={id}
          name={name || id}
          rows={5}
          required={required}
          defaultValue={defaultValue}
          className={error ? classes.invalidInput : ""}
        />
      )}
      {error && <span className={classes.errorLabel}>{error}</span>}
    </p>
  );
};

export default FormItem;
