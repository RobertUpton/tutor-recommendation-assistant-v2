import "./../styles/Login.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  /*** State Variables ***/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*** Navigation ***/
  const navigate = useNavigate();

  /*** Handle Login ***/
  const handleLogin = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      /*** Login Successful ***/
      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        navigate("/dashboard");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

    }
  };

  return (

    /*** Login Page Container ***/
    <div className="login-container">

      {/** Login Card */}
      <div className="login-card">

       
        <h2 className="login-logo">
          TutorMatch <span>AI</span>
        </h2>

        
        <h1>Welcome Back</h1>

        
        <p>
          Sign in to continue to TutorMatch AI.
        </p>

        
        <label>Email Address</label>

        {/** Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        
        <label>Password</label>

        {/** Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/** Login Button */}
        <button
          onClick={handleLogin}
        >
          Login
        </button>

        {/** Bottom Navigation */}
        <div className="login-footer">

          <p>
            Don't have an account?
          </p>

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;