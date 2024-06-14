import { FC } from "react";
import { Link } from "react-router-dom";

interface BackButtonProps {
  label?: string;
}
export const BackButton: FC<BackButtonProps> = ({ label = "Go back" }) => {
  return (
    <Link to=".." relative="route">
      {label}
    </Link>
  );
};
