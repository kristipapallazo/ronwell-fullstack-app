import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Home page </h1>
      <NavLink to="/products">Go to products</NavLink>
    </div>
  );
};

export default HomePage;
