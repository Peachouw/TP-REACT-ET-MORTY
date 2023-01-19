import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Episode from "./Components/Episode";
import Login from "./Components/LoginPage";
import PageAccueil from "./Components/PageAccueil";
import PageEpisode from "./Components/PageEpisode";
import PageFavori from "./Components/PageFavori";
import PagePersonnage from "./Components/PagePersonnage";
import Register from "./Components/Register";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageAccueil />,
    },
    {
        path: "/episodes/:page",
        element: <PageEpisode />,
    },
    {
        path: "/episode/:id",
        element: <Episode />,
    },
    {
        path: "/fav",
        element: <PageFavori />,
    },
    {
        path :"/perso/:characterId",
        element : <PagePersonnage/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/register",
        element: <Register/>
    },
    {
        path:"/dashboard",
        element:<Dashboard/>
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
