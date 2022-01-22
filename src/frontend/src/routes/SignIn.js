import React from "react";
import { useState } from "react/cjs/react.development";
import { signInService, signUpService } from "../apis/userModel";
import "../style/SignIn.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
export default function SignIn() {
  const [input, setInput] = useState({ username: "", password: "" });
  const [inputSignUp, setInputSignUp] = useState({
    username: "",
    password: "",
    confirm: "",
    email: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState("");
  const [errorSignUp, setErrorSignUp] = useState("");
  const history = useHistory();

  const handleAccount = ({ target }) => {
    const { id, value } = target;
    setInput({ ...input, [id]: value });
  };

  const handleAccountSignUp = ({ target }) => {
    const { id, value } = target;
    setInputSignUp({ ...inputSignUp, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(input.username.includes("!")) 
      return setError("Invalid input")
    
    const data = await signInService(input);
    if (data.success) {
      history.push("/home", { token: data.token });
    } else {
      setError(data.message);
    }
  };

  const handleSubmitSignUp = async (e) => {
    if (inputSignUp.password.localeCompare(inputSignUp.confirm) !== 0) {
      return setErrorSignUp("Password is not match");
    } else {
      setErrorSignUp("");
    }
    const data = await signUpService(inputSignUp);
    if (data.success) {
      console.log(data);
    } else {
      setErrorSignUp(data.message);
    }

    e.preventDefault();
  };

  useEffect(() => {
    const loginText = document.querySelector(".title-form .login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");
    signupBtn.addEventListener("click", () => {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    });
    loginBtn.addEventListener("click", () => {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    });
    signupLink.addEventListener("click", () => {
      signupBtn.click();
      return false;
    });
  }, []);
  return (
    <>
      <div className="signIn-form">
        <div className="form-wrapper">
          <div className="title-form">
            <div className="title login">Login Form</div>
            <div className="title signup">Signup Form</div>
          </div>
          <div className="form-container">
            <div className="slide-controls">
              <input type="radio" name="slide" id="login" checked />
              <input type="radio" name="slide" id="signup" />
              <label htmlFor="login" className="slide login">
                Login
              </label>
              <label htmlFor="signup" className="slide signup">
                Signup
              </label>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner">
              <form action="#" className="login" onSubmit={handleSubmit}>
                <div className="form-field">
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={handleAccount}
                    required
                  />
                </div>
                {error && <h4 className="error">{error}</h4>}
                <div className="form-field">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleAccount}
                    required
                  />
                </div>
                {error && <h4 className="error">{error}</h4>}
                <div className="form-pass-link">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="form-field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">
                  Not a member? <a href="#">Signup now</a>
                </div>
              </form>
              <form action="#" className="signup" onSubmit={handleSubmitSignUp}>
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    id="username"
                    onChange={handleAccountSignUp}
                  />
                </div>
                <div className="form-field">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    onChange={handleAccountSignUp}
                  />
                </div>
                <div className="form-field">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    required
                    id="confirm"
                    onChange={handleAccountSignUp}
                  />
                </div>
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    id="email"
                    onChange={handleAccountSignUp}
                  />
                </div>
                {errorSignUp && <h4 className="error">{errorSignUp}</h4>}
                <div className="form-field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
