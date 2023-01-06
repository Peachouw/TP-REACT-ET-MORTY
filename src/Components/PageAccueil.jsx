import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import CartePersonnage from "./CartePersonnage";
import Header from "./Header";

export default function PageAccueil() {
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

        if (nbFavCookie >= 1 && nbFavCookie <= 5) {
            for (var i = 0; i < nbFavCookie; i++) {
                tabChar.push(cookie.fav[nbFavCookie - i - 1]);
                a += tabChar[i] + ",";
            }
        }else if(nbFavCookie>=1 && nbFavCookie>5){
            for (var i = 0; i < 5; i++) {
                tabChar.push(cookie.fav[nbFavCookie - i - 1]);
                a += tabChar[i] + ",";
            }
        }

        for (var i = 0; i < 5; i++) {
            tabChar.push(Math.floor(Math.random() * 826));
            a += tabChar[i+(nbFavCookie>5?5:nbFavCookie)] + ",";
        }

        fetch(a)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setChar(data);
            });
        setLoaded(true);
    }, []);

    if (loaded) {

        for (let index = 0; index < char.length; index++) {
            listPerso.push(<CartePersonnage key={index} data={char[index]} />);
        }
    }

    return (
        <>
            <Header />
            <div className="flex flex-rows flex-wrap justify-around">
                {loaded && listPerso}
            </div>
        </>
    );
}
