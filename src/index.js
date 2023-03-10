import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Components/LoginComponent/Dashboard";
import Episode from "./Components/Episode";
import Login from "./Components/LoginComponent/LoginPage";
import PageAccueil from "./Components/PageAccueil";
import PageEpisode from "./Components/PageEpisode";
import PageFavori from "./Components/PageFavori";
import PagePersonnage from "./Components/PagePersonnage";
import Register from "./Components/LoginComponent/Register";
import "./index.css";
import store from "./Store/store"
import { Provider } from 'react-redux'
import App from './App'


export const router = createBrowserRouter([
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
        path: "/perso/:characterId",
        element: <PagePersonnage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
       <App/>
    </Provider>
);
