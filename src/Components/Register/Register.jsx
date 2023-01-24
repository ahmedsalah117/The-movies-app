import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

function Register() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState([]);

  let navigate = useNavigate();

  function updatingUserData(e) {
    let user = { ...userData };

    user[e.target.name] = e.target.value;

    setUserData(user);
  }

  async function sendingToApi() {
    let { data } = await axios.post(
      `https://route-movies-api.vercel.app/signup`,
      userData
    );

    if (data.message !== "success") {
      setError(data.message);
      console.log(data);
      setIsLoading(false);
    } else {
      //navigate to Login
      navigate(`/login`);
      setIsLoading(false);
    }
  }

  function formSubmiting(e) {
    e.preventDefault();
    console.log(error);
    setIsLoading(true);
    let validationResult = validation();
    if (validationResult.error) {
      setValidationError(validationResult.error.details);
      setIsLoading(false);
    } else {
      sendingToApi();
      setValidationError([]);
    }

    console.log(error.errors.email.message);
  }

  function validation() {
    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(12).required(),
      last_name: Joi.string().min(3).max(12).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(/^[A-Z][a-z]{3,6}/)
        .required(),
      age: Joi.number().min(16).required(),
    });
    scheme.validate(userData, { abortEarly: false });
    // console.log(scheme.validate(userData, { abortEarly: false }));
    return scheme.validate(userData, { abortEarly: false });
  }

  return (
    <>
      <section className="register">
        <form onSubmit={formSubmiting} className="w-75 m-auto">
          <label htmlFor="first_name" className="mb-2">
            first_name:
          </label>
          <input
            onChange={updatingUserData}
            type="text"
            name="first_name"
            id="first_name"
            className="form-control mb-3"
          />
          {validationError.length > 0
            ? validationError
                .filter((err) => {
                  return err.context.key == "first_name";
                })
                .map((e, index) => {
                  return (
                    <div key={index} className="alert alert-danger my-3">
                      {e.message}
                    </div>
                  );
                })
            : ""}

          <label htmlFor="last_name" className="mb-2">
            last_name:
          </label>
          <input
            onChange={updatingUserData}
            type="text"
            name="last_name"
            id="last_name"
            className="form-control mb-3"
          />

          {validationError.length > 0
            ? validationError
                .filter((err) => {
                  return err.context.key == "last_name";
                })
                .map((e, index) => {
                  return (
                    <div key={index} className="alert alert-danger my-3">
                      {e.message}
                    </div>
                  );
                })
            : ""}
          <label htmlFor="age" className="mb-2">
            age:
          </label>
          <input
            onChange={updatingUserData}
            type="number"
            name="age"
            id="age"
            className="form-control mb-3"
          />
          {validationError.length > 0
            ? validationError
                .filter((err) => {
                  return err.context.key == "age";
                })
                .map((e, index) => {
                  return (
                    <div key={index} className="alert alert-danger my-3">
                      {e.message}
                    </div>
                  );
                })
            : ""}
          <label htmlFor="email" className="mb-2">
            email:
          </label>
          <input
            onChange={updatingUserData}
            type="email"
            name="email"
            id="email"
            className="form-control mb-3"
          />
          {validationError.length > 0
            ? validationError
                .filter((err) => {
                  return err.context.key == "email";
                })
                .map((e, index) => {
                  return (
                    <div key={index} className="alert alert-danger my-3">
                      {e.message}
                    </div>
                  );
                })
            : ""}
          {error ? (
            <div className="alert alert-danger my-3">{error.split(":")[2]}</div>
          ) : (
            ""
          )}

          <label htmlFor="password" className="mb-2">
            password:
          </label>
          <input
            onChange={updatingUserData}
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
          />

          {validationError.length > 0
            ? validationError
                .filter((err) => {
                  return err.context.key == "password";
                })
                .map((e, index) => {
                  return (
                    <div key={index} className="alert alert-danger my-3">
                      password is invalid
                    </div>
                  );
                })
            : ""}
          <button type="submit" className="btn btn-info form-btn mt-2">
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </section>
    </>
  );
}

export default Register;
