import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Home page </h1>
      <NavLink to="/events">Go to events</NavLink>
    </div>
  );
};

export default HomePage;
