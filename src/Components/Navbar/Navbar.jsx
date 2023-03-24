import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../Context/SearchContext";
import { SearchContext } from "./../Context/SearchContext";
import classes from "./Navbar.module.css";
function Navbar({ userData, logOut }) {
  let {
    searchedValue,
    setSearchedValue,
    setPeopleSearch,
    setMultiSearch,
    setMovieSearch,
    setTVSearch,
  } = useContext(SearchContext);
  function searchFunction(value) {
    if (value == "" || value == null || value == undefined) {
      setSearchedValue(null);
      setMovieSearch([]);
      setPeopleSearch([]);
      setMultiSearch([]);
      setTVSearch([]);
    } else {
      setSearchedValue(value);
    }

    // console.log("The nav function is working", searchedValue);
  }
  return (
    <>
      <nav className="navbar pt-4 navbar-dark navbar-expand-lg bg-light mb-5">
        <div className="container-fluid">
          <Link className="navbar-brand Logo pb-2 ms-3 d-flex" to="">
            Noxe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="movies">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="tv">
                      Tv Show
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="people">
                      People
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="networks">
                      Networks
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}

            {userData !== null ? (
              <>
                <div
                  className={`ms-3 ms-auto d-flex ${classes.searchFormHolder}`}
                >
                  <form
                    className={`d-flex ${classes.searchInput} me-3`}
                    role="search"
                  >
                    <input
                      onChange={(e) => {
                        return searchFunction(e.target.value);
                      }}
                      className="form-control search-input"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </form>
                  <div className="icons pt-2">
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-spotify"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-youtube"></i>
                  </div>
                </div>
                <div className={`${classes.profileBtnHolder} d-flex`}>
                  <Link to="profile" className="nav-link me-3">
                    Profile
                  </Link>
                  <h4 className="pt-1" onClick={logOut}>
                    Log out
                  </h4>
                </div>
              </>
            ) : (
              <div
                className={`d-flex ms-auto flex-wrap ${classes.loginPgBtns}`}
              >
                <Link className="mx-4 nav-link d-block" to="login">
                  Login
                </Link>
                <Link className="mx-4 nav-link d-block" to="register">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
