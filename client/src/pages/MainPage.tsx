import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={classes.container}>
      <MainNavigation />
      <div className={classes.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
