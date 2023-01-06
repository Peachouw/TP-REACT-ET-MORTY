import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import CartePersonnage from "./CartePersonnage";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function PageFavori() {
    const [char, setChar] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(["fav"]);
    const listPerso = [];

    useEffect(() => {
        var nbFavCookie = 0;
        if (cookie.fav != undefined && cookie.fav.length > 0) {
            console.log(cookie);
            nbFavCookie = cookie.fav.length;
        }
        var tabChar = [];
        var a = "https://rickandmortyapi.com/api/character/";

        for (var i = 0; i < nbFavCookie; i++) {
            tabChar.push(cookie.fav[nbFavCookie - i - 1]);
            a += tabChar[i] + ",";
        }
        fetch(a)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setChar(data);
            });
        setLoaded(true);
        console.log(listPerso);
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
                <h1 className="text-3xl mt-5 underline font-normal leading-normal text-slate-800">
                    Page Favori
                </h1>
            </div>
            <div className="flex flex-rows flex-wrap justify-around">
                {loaded && listPerso}
                {listPerso.length === 0 && (
                    <h1 className="mt-10 text-2xl">
                        Aucun personnage en favori, rendez vous sur la page
                        épisode :{" "}
                        <Link
                            to={"/episodes/1"}
                            relative="path"
                        >
                            Lien
                        </Link>
                    </h1>
                )}
            </div>
        </>
    );
}
