import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../../Css/Login.css";
import Header from "../Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (<>
    <Header/>
    <div className="img_rick">
                <img src="/img/rick.png" className="mr-3" alt="Flowbite Logo" />
            </div>
            <div className="img_morty">
                <img src="/img/morty.png" className="mr-3" alt="Flowbite Logo" />
            </div>
    <div className="login mt-32">
      <div className="login__container rounded-xl ">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresse email"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
        <button
          className="login__btn bg-slate-800 rounded-lg"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Connexion
        </button>
        <button className="login__btn login__google  rounded-lg" onClick={signInWithGoogle}>
          Connexion avec Google
        </button>
        <div>
          {/* <Link to="/reset">Mot de passe oublié ?</Link> */}
        </div>
        <div>
          Pas encore de compte ? <Link to="/register"><span className="underline">Inscription ici.</span></Link>
        </div>
      </div>
    </div>
    </>
  );
}
export default Login;