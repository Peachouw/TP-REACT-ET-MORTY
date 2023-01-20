import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { selectOnlineUser } from "../Store/OnlineUserReducer";
import CartePersonnage from "./CartePersonnage";
import Header from "./Header";

export default function PageAccueil() {
    const [char, setChar] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(["fav"]);
    const listPerso = [];
    const onlineUser = useSelector(selectOnlineUser)
    console.log(onlineUser);
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
            
            <div style={{ textAlign: "center", width: 300, margin: "0 auto" }}>
                <h1 className="text-3xl mt-5 font-normal leading-normal text-slate-800">
                {onlineUser.userName ? <h1>Hello {onlineUser.userName}</h1> : <h1>Hello inconnu</h1>}                </h1>
            </div>
            <div className="flex flex-rows flex-wrap justify-around">
                {loaded && listPerso}
            </div>
        </>
    );
}
