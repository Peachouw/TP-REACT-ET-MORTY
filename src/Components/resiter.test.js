import { testRegister } from "./LoginComponent/Register";
import { findByRole, getByRole, queryAllByTestId, queryByDisplayValue, render, screen } from "@testing-library/react";
import Register from "./LoginComponent/Register";
import PageAccueil from "./PageAccueil";
import LoginPage from "./LoginComponent/LoginPage";
import { Route, Router, useNavigate } from "react-router-dom";
import { createMemoryHistory } from "@remix-run/router";
import { Provider, useSelector } from "react-redux";
import store from "../Store/store";
import PageFavori from "./PageFavori";
import Header from "./Header";

describe("Assert testRegister function", () => {
    test("Test touts champs vides", () => {
        expect(testRegister("", "", "")).toEqual(false);
    });
    test("Test form valide", () => {
        expect(testRegister("Paul", "paul@paul.fr", "paulpaul")).toEqual(true);
    });
    test("Test touts champs vides", () => {
        expect(testRegister("", "", "")).toEqual(false);
    });
    test("Test email invalide sans '.xx a la fin'", () => {
        expect(testRegister("Paul", "paul@paul", "paulpaul")).toEqual(false);
    });
    test("Test email invalide sans '@'", () => {
        expect(testRegister("Paul", "paul.fr", "paulpaul")).toEqual(false);
    });
    test("Test mdp à 7 char (assert < 8)", () => {
        expect(testRegister("Paul", "paul@paul.fr", "paulpau")).toEqual(false);
    });
    test("Test nom vide", () => {
        expect(testRegister("", "paul@paul.fr", "paulpaul")).toEqual(false);
    });
    test("Test email vide", () => {
        expect(testRegister("Paul", "", "paulpaul")).toEqual(false);
    });
    test("Test pwd vide", () => {
        expect(testRegister("Paul", "paul@paul.fr", "")).toEqual(false);
    });
    test("Test pas d'argument", () => {
        expect(testRegister()).toEqual(false);
    });
    test("Test un seul argument", () => {
        expect(testRegister("paul")).toEqual(false);
    });
    test("Register component render without crashes", () => {
        const history = createMemoryHistory();
        history.push("/register");
        render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <Register />
                </Router>
            </Provider>
        );
    });
    test("Page d'accueil component render without crashes", () => {
        const history = createMemoryHistory();
        history.push("/");
        render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <PageAccueil />
                </Router>
            </Provider>
        );
    });
    test("Page de favoris component render without crashes", () => {
        const history = createMemoryHistory();
        history.push("/fav");
        render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <PageFavori />
                </Router>
            </Provider>
        );
    });
    test("Image du header bien présente", async () => {
        const history = createMemoryHistory();
        history.push("/");
        render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <Header />
                </Router>
            </Provider>
        );
        expect(screen.getByRole("img", {name:"Logo"})).toBeInTheDocument;

    });
});
