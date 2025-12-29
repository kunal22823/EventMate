import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  // Sign-up state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupAttempted, setSignupAttempted] = useState(false);

  // Sign-in state
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinAttempted, setSigninAttempted] = useState(false);

  // Basic validators
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (pw) => pw && pw.length >= 6;
  const isValidName = (n) => n && n.trim().length > 0;

  const canSignup = isValidName(signupName) && isValidEmail(signupEmail) && isValidPassword(signupPassword);
  const canSignin = isValidEmail(signinEmail) && isValidPassword(signinPassword);

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupAttempted(true);
    if (canSignup) {
      // No persistent storage — just navigate when inputs are valid
      navigate("/dashboard");
    }
  };

  const handleSignin = (e) => {
    e.preventDefault();
    setSigninAttempted(true);
    if (canSignin) {
      // No real auth check — navigate when inputs look valid
      navigate("/dashboard");
    }
  };

  return (
    <div className={`container ${isRegister ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignup} noValidate>
          <h1>Create Account</h1>

          <input
            type="text"
            placeholder="Name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            aria-label="Name"
          />
          {signupAttempted && !isValidName(signupName) && (
            <div className="error">Please enter your name.</div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            aria-label="Email"
          />
          {signupAttempted && !isValidEmail(signupEmail) && (
            <div className="error">Please enter a valid email address.</div>
          )}

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            aria-label="Password"
          />
          {signupAttempted && !isValidPassword(signupPassword) && (
            <div className="error">Password must be at least 6 characters.</div>
          )}

          <button
            type="submit"
            disabled={!canSignup}
            aria-disabled={!canSignup}
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleSignin} noValidate>
          <h1>Sign In</h1>

          <input
            type="email"
            placeholder="Email"
            value={signinEmail}
            onChange={(e) => setSigninEmail(e.target.value)}
            aria-label="Email"
          />
          {signinAttempted && !isValidEmail(signinEmail) && (
            <div className="error">Please enter a valid email address.</div>
          )}

          <input
            type="password"
            placeholder="Password"
            value={signinPassword}
            onChange={(e) => setSigninPassword(e.target.value)}
            aria-label="Password"
          />
          {signinAttempted && !isValidPassword(signinPassword) && (
            <div className="error">Password must be at least 6 characters.</div>
          )}

          <a href="#" onClick={(e) => e.preventDefault()}>
            Forget Your Password?
          </a>
          <button
            type="submit"
            disabled={!canSignin}
            aria-disabled={!canSignin}
          >
            Sign In
          </button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button
              className="hidden"
              id="login"
              type="button"
              onClick={() => setIsRegister(false)}
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button
              className="hidden"
              id="register"
              type="button"
              onClick={() => setIsRegister(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;