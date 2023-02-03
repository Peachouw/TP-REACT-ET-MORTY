import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../Css/Dashboard.css";
import { auth, db, logout } from "../../firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectOnlineUser, setUserAuth, setUserEmail, setUserId, setUserName, unlogUser } from "../../Store/OnlineUserReducer";
import Header from "../Header";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userOnline = useSelector(selectOnlineUser);
    console.log(userOnline);

    const fetchUserName = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        console.log(data);
        dispatch(setUserName(data.name));
        dispatch(setUserEmail(data.email));
        dispatch(setUserAuth(data.authProvider));
        dispatch(setUserId(data.uid));
        console.log(userOnline);
        setName(data.name);
    };

    useEffect(() => {
        if (loading) return;
        if (!user) {
            dispatch(unlogUser());
            return navigate("/login");
        }
        fetchUserName();
    }, [user, loading]);
    return (
        <>
            <Header />
            <div className="dashboard">
                <div className="dashboard__container">
                    Logged in as
                    <div>{name}</div>
                    <div>{user?.email}</div>
                    <button className="dashboard__btn" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
export default Dashboard;
