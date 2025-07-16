import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/otps", {
        method: "POST",
        body: JSON.stringify({
          email: e.target.userEmail.value,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const respObj = await resp.json();
      setLoading(false);

      if (respObj.status === "success") {
        setIsOtpSent(true);
        setFullName(e.target.fullName.value);
        setEmail(e.target.userEmail.value);
      } else {
        alert("Error " + respObj.message);
      }
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      if (e.target.password.value !== e.target.confirmPassword.value) {
        alert("Passwords do not match!");
        return;
      }

      setLoading(true);

      const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          fullName,
          otp: e.target.otp.value,
          password: e.target.password.value,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const respObj = await resp.json();
      setLoading(false);

      if (respObj.status === "success") {
        navigate("/login");
      } else {
        alert("Error " + respObj.message);
      }
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <form
        className="signup-box"
        onSubmit={isOtpSent ? handleRegister : handleSendOtp}
      >
        <h1>{isOtpSent ? "Complete Registration" : "Sign Up"}</h1>

        {/* Full Name input: always rendered but conditionally editable */}
        <input
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          readOnly={isOtpSent}
          required
        />

        {/* Email input: same logic */}
        <input
          type="email"
          name="userEmail"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={isOtpSent}
          required
        />

        {/* Conditional Fields */}
        {isOtpSent && (
          <>
            <input
              type="number"
              placeholder="OTP"
              name="otp"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
            />
          </>
        )}

        <button>{isOtpSent ? "Register" : "Send OTP"}</button>
        {loading && <div className="spinner"></div>}
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default SignUpPage;
