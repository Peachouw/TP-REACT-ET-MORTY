import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function CartePersonnage(props) {
    const [cookie, setCookie, removeCookie] = useCookies(["fav"]);
    const [isLiked, setIsLiked] = useState(
        cookie.fav != undefined ? cookie.fav.includes(props.data.id) : false
    );

    function addCookie() {
        var tabCookie = cookie.fav != undefined ? cookie.fav : [];
        tabCookie.includes(props.data.id)
            ? tabCookie.splice(tabCookie.indexOf(props.data.id), 1)
            : tabCookie.push(props.data.id);

        console.log(tabCookie);
        setCookie("fav", tabCookie, {path: '/'});
        setIsLiked(!isLiked);
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md mt-10">
            <div className="content-center w-full">
                <Link
                    to={"/perso/" + props.data.id}
                    className="flex items-center"
                    relative="path"
                >
                    <img
                        className="mx-auto rounded-lg p-3"
                        src={props.data.image}
                        alt=""
                    />
                </Link>
            </div>
            <div className="p-5">
                <Link
                    to={"/perso/" + props.data.id}
                    className="flex items-center"
                    relative="path"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {props.data.name}
                    </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 text-gray-400">
                    <Link
                        to={"/perso/" + props.data.id}
                        className="flex items-center"
                        relative="path"
                    >
                        Lien vers la page personnage
                    </Link>
                </p>
                <div
                    href="#"
                    className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg"
                    onClick={addCookie}
                >
                    {isLiked ? (
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{ color: "red" }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{ color: "white" }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
