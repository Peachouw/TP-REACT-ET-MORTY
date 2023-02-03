import "../Css/Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOnlineUser } from "../Store/OnlineUserReducer";
export default function Header() {
    const userOnline = useSelector(selectOnlineUser)
    return (
        <nav className="bg-gray-900 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="./" >
                    <Link to="/" className="flex items-center" relative="path">
                        <img
                            src="/img/rick-header.png"
                            className="h-6 mr-3 sm:h-9"
                            alt="Logo"
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                            Rick & Morty Fan Site
                        </span>
                    </Link>
                </a>
            
                <div
                    className="w-full md:block md:w-auto"
                    id="navbar-default"
                >
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                    <li>
                            <a 
                                href="#"
                                className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                <Link to="/episodes/1" relative="path">
                                    Episodes
                                </Link>
                            </a>
                        </li>
                        {userOnline.userId != 0 &&
                        <li>
                            <a  name={"fav"}
                                href="#"
                                className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-gray-400 md:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                <Link to="/fav/" relative="path" id="fav">
                                    Favoris
                                </Link>
                            </a>
                        </li>}
                        <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                <Link to="/login" relative="path">
                                    {userOnline.userId == 0 ? "Connection / Inscription" : "Déconnection"}
                                </Link>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
