import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ currUser, handleLogout }) => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/pngegg.png" alt="Logo" className="logo" />
          <span className="brand">User Task Reminder</span>
        </div>

        <div className="navbar-right">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Home
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Tasks
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Contact
          </NavLink>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Spacer to prevent overlap with fixed navbar */}
      <div style={{ height: "60px" }}></div>
    </>
  );
};

export default Navbar;
