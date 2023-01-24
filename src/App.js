import React, { useState, useEffect } from "react";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import RouteLayout from "./Components/Layout/RouteLayout";
import About from "./Components/About/About";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import People from "./Components/People/People";
import Movies from "./Components/Movies/Movies";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import TV from "./Components/TV/TV";
import Network from "./Components/Network/Network";
import jwtDecode from "jwt-decode";
import ItemDetails from "./Components/ItemDetails/ItemDetails";
import { Offline, Online } from "react-detect-offline";
import MediaContextProvider from "./Components/Context/MediaContext";
import SearchContextProvider from "./Components/Context/SearchContext";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";

function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    // console.log(decodedToken);
    setUserData(decodedToken);
  }

  const Routers = createBrowserRouter([
    {
      path: "/",
      element: <RouteLayout userData={userData} setUserData={setUserData} />,
      children: [
        {
          path: "The-movies-app/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        {
          path: "movies",
          element: (
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectedRoute>
              <People />
            </ProtectedRoute>
          ),
        },
        {
          path: "tv",
          element: (
            <ProtectedRoute>
              <TV />
            </ProtectedRoute>
          ),
        },
        {
          path: "networks",
          element: (
            <ProtectedRoute>
              <Network />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile userData={userData} />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <h2 className="text-center mt-5">404 Page Not Found</h2>,
        },
        {
          path: "itemDetails/:id/:mediaType",
          element: (
            <ProtectedRoute>
              <ItemDetails />
            </ProtectedRoute>
          ),
        },

        {
          path: "loading",
          element: (
            <ProtectedRoute>
              <LoadingScreen />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <div>
        <Offline>
          <div className="offline">Oops! you are offline.</div>
        </Offline>
      </div>

      <RouterProvider router={Routers} />
    </>
  );
}

export default App;
