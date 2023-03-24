import React, { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
function Login({ saveUserData }) {
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  function updatingLoginData(e) {
    let loginInfo = { ...loginData };

    loginInfo[e.target.name] = e.target.value;

    setLoginData(loginInfo);
  }

  let navigate = useNavigate();

  async function sendToAPI() {
    let { data } = await axios.post(
      "https://route-movies-api.vercel.app/signin",
      loginData
    );

    if (data.message == "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      saveUserData();
      navigate("/");
      //here is a test comment
      //here is a test comment
    } else {
      setIsLoading(false);
      setLoginError(data.message);
    }
  }

  function loginSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    let validationResult = validation();

    if (validationResult.error) {
      if (validationResult.error.details[0].context.label == "password") {
        setIsLoading(false);
        setLoginError("Password is invalid");
      } else {
        setIsLoading(false);
        setLoginError(validationResult.error.message);
      }
    } else {
      sendToAPI();
    }

    // sendToAPI();
  }

  function validation() {
    let scheme = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(/^[A-Z][a-z]{3,6}/)
        .required(),
    });

    return scheme.validate(loginData, { abortEarly: false });
  }

  return (
    <>
      <section className={classes["login-section"]}>
        <form onSubmit={loginSubmit} className="">
          <div className="w-50 m-auto">
            <div className="w-100 mt-5">
              <input
                onChange={updatingLoginData}
                type="email"
                className="form-control w-100  mb-5 fs-4"
                name="email"
                id="email"
                placeholder="Email address"
              />

              <input
                onChange={updatingLoginData}
                type="password"
                className="form-control w-100 fs-4"
                name="password"
                id="password"
                placeholder="Password"
              />

              {loginError ? (
                <div className="alert alert-danger my-3 w-75 m-auto">
                  {loginError}
                </div>
              ) : (
                ""
              )}

              <button type="submit" className="btn btn-info mt-4 fs-4">
                {isLoading ? (
                  <i className="fas fa-spin fa-spinner"></i>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
