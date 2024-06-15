import { FC } from "react";
import classes from "./Label.module.css";

interface LabelProps {
  msg?: string;
}
const Label: FC<LabelProps> = ({ msg = "No items available." }) => {
  return <div className={classes.label}>{msg}</div>;
};

export default Label;
