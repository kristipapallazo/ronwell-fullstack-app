import { FC } from "react";
import classes from "./FormItem.module.css";

interface FormItemProps {
  item: InputItem;
  defaultValue?: string;
  error?: string;
}

const FormItem: FC<FormItemProps> = ({
  item,
  defaultValue = undefined,
  error,
}) => {
  const { id, label, type = "text", required = true } = item;
  return (
    <p className={classes.section}>
      <label htmlFor={id}>{label}</label>
      {type !== "textarea" ? (
        <input
          id={id}
          type={type}
          name={id}
          required={required}
          defaultValue={defaultValue}
          className={error ? classes.invalidInput : ""}
        />
      ) : (
        <textarea
          id={id}
          name={id}
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
