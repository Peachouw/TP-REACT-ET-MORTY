import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import CartePersonnage from "./CartePersonnage";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectOnlineUser, setUserFavs } from "../Store/OnlineUserReducer";


var tabFav;
export default function PageFavori() {
    const [char, setChar] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const listPerso = [];
    const user = useSelector(selectOnlineUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function t() {
        const q = query(collection(db, "users"), where("uid", "==", user.userId));

        var cookieDocs = await getDocs(q);
        cookieDocs = cookieDocs.docs[0];

        cookieDocs = doc(db, "users", cookieDocs.id);
        const t = await getDoc(cookieDocs);
        var tabFavs = t.data().favs;
        console.log(tabFavs);
        return tabFavs;
    }

    useEffect(() => {
        console.log(user.userFavs);

        if (user.userId == 0) navigate("/");
        var ta = t().then((response) => {
            console.log(response);
            var nbFavCookie = 0;
            if (response != undefined && response.length > 0) {
                console.log(response);
                nbFavCookie = response.length;
            }
            var tabChar = [];
            var a = "https://rickandmortyapi.com/api/character/";

            for (var i = 0; i < nbFavCookie; i++) {
                tabChar.push(response[nbFavCookie - i - 1]);
                a += tabChar[i] + ",";
            }
            fetch(a)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setChar(data);
                    setLoaded(true);
                    tabFav=user.userFavs
                    console.log(tabFav);
                });
        });
    }, [user.userFavs]);

    console.log(char);
    return (
        <>
            <Header />
            <div style={{ textAlign: "center", width: 300, margin: "0 auto" }}>
                <h1 className="text-3xl mt-5 underline font-normal leading-normal text-slate-800">Page Favori</h1>
            </div>
            <div className="flex flex-rows flex-wrap justify-around">
                {loaded && char.length>0 &&
                    char.map((value, index) => {
                        return <CartePersonnage key={index} data={value} />;
                    })}
                {char.info != undefined && (
                    <h1 className="mt-10 text-2xl">
                        Aucun personnage en favori, rendez vous sur la page épisode :{" "}
                        <Link to={"/episodes/1"} relative="path">
                            Lien
                        </Link>
                    </h1>
                )}
            </div>
        </>
    );
}
