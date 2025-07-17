import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Add this
import "./LoginPage.css";

const LoginPage = ({ afterLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
   console.log("Submitting login form", email, password);
    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/login", {
      method: "POST",
      
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    const respObj = await resp.json();
    setLoading(false);

    if (respObj.status === "success") {
      afterLogin(respObj);
    } else {
      alert(respObj.message);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-box" onSubmit={handleLogin}>
        <h1>Login Page</h1>
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {loading && <div className="spinner"></div>}

        {/* ✅ Register Link */}
        <p style={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <Link to="/sign-up" style={{ color: "#4CAF50", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
