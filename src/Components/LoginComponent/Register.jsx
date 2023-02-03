import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../../firebase/firebase";
import "../../Css/Register.css";
import Header from "../Header";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [errorMDP, setErrorMDP] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const register = () => {
        if (testRegister(name, email, password)) registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);

    useEffect(() => {
        if (password.length < 8 && password.length > 0) {
            setErrorMDP(" - Le mot de passe est trop court ( < 8 caractères)");
        } else {
            setErrorMDP("");
        }
    }, [password]);

    useEffect(() => {
        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            ) &&
            email.length > 0
        ) {
            setErrorEmail(" - Email invalide : doit respecter la forme email@email.email");
        } else {
            setErrorEmail("");
        }
    }, [email]);

    return (
        <>
            <Header />
            <div className="img_rick">
                <img src="/img/rick.png" className="mr-3" alt="Flowbite Logo" />
            </div>
            <div className="img_morty">
                <img src="/img/morty.png" className="mr-3" alt="Flowbite Logo" />
            </div>  
            <div className="register mt-20">
                <div className="register__container rounded-xl">
                    <input type="text" className="register__textBox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" />
                    <input
                        type="text"
                        className="register__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Adresse email"
                    />
                    <input
                        type="password"
                        className={`register__textBox ${errorEmail && "outline-green-600"}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                    <button className="register__btn rounded-lg bg-slate-800 " onClick={register}>
                        Inscription
                    </button>
                    <button className="register__btn register__google rounded-lg bg-blue-600" onClick={signInWithGoogle} >
                        Inscription avec Google
                    </button>
                    <div>
                        Déjà un compte ?{" "}
                        <Link to="/login">
                            <span className="underline">Page de connexion</span>
                        </Link>
                    </div>
                    <p className="pt-2 text-red-600">{errorMDP}</p>
                    <p className="text-red-600 pt-1">{errorEmail}</p>
                </div>
            </div>
        </>
    );
}
export default Register;

export function testRegister(name, email, password) {
    if (!name) {
        console.log("Please enter name");
        return false;
    } else if (!email) {
        return false;
    } else if (!password) {
        return false;
    } else {
        if (
            name.length >= 1 &&
            password.length > 7 &&
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            return true;
        } else {
            console.log("PAS BON !");
            return false;
        }
    }
}
