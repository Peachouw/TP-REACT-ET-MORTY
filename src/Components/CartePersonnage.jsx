import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectOnlineUser, setUserFavs } from "../Store/OnlineUserReducer";
import { db } from "../firebase/firebase";
import { useEffect } from "react";

export default function CartePersonnage(props) {
    const [cookie, setCookie, removeCookie] = useCookies(["fav"]);
    const [isLiked, setIsLiked] = useState(cookie.fav != undefined ? cookie.fav.includes(props.data.id) : false);
    const user = useSelector(selectOnlineUser);
    const dispatch = useDispatch()

    useEffect(()=>{
        async function t() {
            const q = query(collection(db, "users"), where("uid", "==", user.userId));

            var cookieDocs = await getDocs(q);
            cookieDocs = cookieDocs.docs[0];

            cookieDocs = doc(db, "users", cookieDocs.id);
            const t = await getDoc(cookieDocs);
            var tabFavs = t.data().favs;

            return tabFavs;
        }
        var ta = t().then((response) => {
            setIsLiked(response.includes(props.data.id))
        })
    },[])

    async function addCookie() {
        const q = query(collection(db, "users"), where("uid", "==", user.userId));

        var cookieDocs = await getDocs(q);
        cookieDocs = cookieDocs.docs[0];

        cookieDocs = doc(db, "users", cookieDocs.id);
        const t = await getDoc(cookieDocs);
        var tabFavs = t.data().favs;
        if (tabFavs == undefined) {
            tabFavs = [props.data.id]
        } else {
            tabFavs.includes(props.data.id) ? tabFavs.splice(tabFavs.indexOf(props.data.id), 1) : tabFavs.push(props.data.id);
        }
        console.log(tabFavs);
        dispatch(setUserFavs(tabFavs))
        await updateDoc(cookieDocs, {
            favs: tabFavs,
        });
        setIsLiked(!isLiked);
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md mt-10">
            <div className="content-center w-full">
                <Link to={"/perso/" + props.data.id} className="flex items-center" relative="path">
                    <img className="mx-auto rounded-lg p-3" src={props.data.image} alt="" />
                </Link>
            </div>
            <div className="p-5">
                <Link to={"/perso/" + props.data.id} className="flex items-center" relative="path">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.data.name}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 text-gray-400">
                    <Link to={"/perso/" + props.data.id} className="flex items-center" relative="path">
                        Lien vers la page personnage
                    </Link>
                </p>
                {user.userId != 0 &&
                <div
                    href="#"
                    className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg"
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
        </div>
    );
}
