import { FC } from "react";
import classes from "./ErrorLabels.module.css";

interface ErrorLabelProps {
  msg: string;
}
const ErrorLabel: FC<ErrorLabelProps> = ({ msg }) =>
  msg ? <p className={classes.label}>{msg}</p> : <></>;

export default ErrorLabel;
