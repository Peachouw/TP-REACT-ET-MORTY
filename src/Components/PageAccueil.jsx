import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { selectOnlineUser } from "../Store/OnlineUserReducer";
import CartePersonnage from "./CartePersonnage";
import Header from "./Header";

export default function PageAccueil() {
    const [char, setChar] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(["fav"]);
    const listPerso = [];
    const user = useSelector(selectOnlineUser);
    console.log(user);
    useEffect(() => {
        async function t() {
            if (user.userId != 0) {
                const q = query(collection(db, "users"), where("uid", "==", user.userId));

                var cookieDocs = await getDocs(q);
                cookieDocs = cookieDocs.docs[0];

                cookieDocs = doc(db, "users", cookieDocs.id);
                const t = await getDoc(cookieDocs);
                var tabFavs = t.data().favs;
                return tabFavs;
            }
        }
        var AllCookie = t().then((response) => {
            console.log(response);
            var nbFavCookie = 0;
            if (response != undefined && response.length > 0) {
                nbFavCookie = response.length;
            }
            var tabChar = [];
            var a = "https://rickandmortyapi.com/api/character/";

            if (nbFavCookie >= 1 && nbFavCookie <= 5) {
                for (var i = 0; i < nbFavCookie; i++) {
                    tabChar.push(response[nbFavCookie - i - 1]);
                    a += tabChar[i] + ",";
                }
            } else if (nbFavCookie >= 1 && nbFavCookie > 5) {
                for (var i = 0; i < 5; i++) {
                    tabChar.push(response[nbFavCookie - i - 1]);
                    a += tabChar[i] + ",";
                }
            }

            for (var i = 0; i < 5; i++) {
                tabChar.push(Math.floor(Math.random() * 826));
                a += tabChar[i + (nbFavCookie > 5 ? 5 : nbFavCookie)] + ",";
            }

            fetch(a)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setChar(data);
                });
            setLoaded(true);
        });
    }, []);

    if (loaded) {
        for (let index = 0; index < char.length; index++) {
            listPerso.push(<CartePersonnage key={index} data={char[index]} />);
        }
    }

    return (
        <>
            <Header />

            <div style={{ textAlign: "center", width: 300, margin: "0 auto" }}>
                <h1 className="text-3xl mt-5 font-normal leading-normal text-slate-800">
                    {user.userName ? <h1>Hello {user.userName}</h1> : <h1>Hello inconnu</h1>}{" "}
                </h1>
            </div>
            <div className="flex flex-rows flex-wrap justify-around">{loaded && listPerso}</div>
        </>
    );
}
