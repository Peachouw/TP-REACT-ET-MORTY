import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { selectOnlineUser } from "../Store/OnlineUserReducer";

export default function PagePersonnage() {
    const [char, setChar] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [tabEpisode, setTabEpisode] = useState([]);
    const [cookie, setCookie, removeCookie] = useCookies(["fav"]);
    const [isLiked, setIsLiked] = useState(false);
    const tab = [];
    const user = useSelector(selectOnlineUser);

    const { characterId } = useParams();

    useEffect(() => {
        var a = "https://rickandmortyapi.com/api/character/" + characterId;
        fetch(a)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setChar(data);
                setIsLiked(cookie.fav != undefined ? cookie.fav.includes(data.id) : false);
                data.episode.map((item, index) => {
                    fetch(item)
                        .then((response) => {
                            return response.json();
                        })
                        .then((a) => {
                            tabEpisode.push(a);
                            if (index === data.episode.length - 1) {
                                setLoaded(true);
                            }
                        });
                });

                console.log(tabEpisode);
            });
    }, []);

    useEffect(() => {
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
        var ta = t().then((response) => {
            setIsLiked(response.includes(characterId));
        });
    }, []);

    async function addCookie() {
        const q = query(collection(db, "users"), where("uid", "==", user.userId));

        var cookieDocs = await getDocs(q);
        cookieDocs = cookieDocs.docs[0];

        cookieDocs = doc(db, "users", cookieDocs.id);
        const t = await getDoc(cookieDocs);
        var tabFavs = t.data().favs;
        if (tabFavs == undefined) {
            tabFavs = [characterId];
        } else {
            tabFavs.includes(characterId) ? tabFavs.splice(tabFavs.indexOf(characterId), 1) : tabFavs.push(parseInt(characterId));
        }
        console.log(tabFavs);

        await updateDoc(cookieDocs, {
            favs: tabFavs,
        });
        setIsLiked(!isLiked);
    }

    return (
        <>
            <Header />
            {loaded && (
                <>
                    <div className="flex flex-rows flex-wrap text-center content-center w-full bg-slate-100 h-fit p-5">
                        <div className="text-center w-48 bg-slate-900 h-fit pt-2 pr-2 pl-2 rounded-md">
                            <img src={char.image} className="w-48 " alt="" />
                            <h1 className="text-xl text-slate-100 font-normal leading-normal mt-0 mb-2">{char.name}</h1>
                        </div>
                        <div className="ml-auto mr-auto  pl-5">
                            <p className="text-xl">Statut : {char.status}</p>
                            <p className="text-xl">Sexe : {char.gender}</p>
                            <p className="text-xl">
                                Type : {char.type}
                                {console.log(tabEpisode)}
                            </p>
                            <div className="text-xl">Origine : {char.origin.name}</div>
                        </div>
                        {user.userId != 0 &&
                        <div
                            href="#"
                            className="ml-auto mr-0 right cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg"
                            onClick={addCookie}
                        >
                            {isLiked ? (
                                <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
                            ) : (
                                <FontAwesomeIcon icon={faHeart} style={{ color: "white" }} />
                            )}
                        </div>
                        }
                    </div>

                    <div className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">Code</th>
                                    <th className="px-6 py-4">Nom</th>
                                    <th className="px-6 py-4">Date de sortie</th>
                                    <th className="px-6 py-4">Lien</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabEpisode.map((item, index) => {
                                    return (
                                        <tr>
                                            <td className="px-6 py-4">{item.episode}</td>
                                            <td className="px-6 py-4">{item.name}</td>
                                            <td className="px-6 py-4">{item.air_date}</td>
                                            <td className="px-6 py-4">
                                                <Link to={"/episode/" + item.id} className="flex items-center" relative="path">
                                                    Voir les infos de l'épisode
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
}
