import { FC } from "react";
import { BackButton } from "../components/UI/Button/Button.tsx";
import classes from "./PageContent.module.css";

interface PageContentProps {
  title: string;
  children: React.ReactNode;
}
const PageContent: FC<PageContentProps> = ({
  title,
  children,
}: PageContentProps) => {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
      <BackButton />
    </div>
  );
};

export default PageContent;
