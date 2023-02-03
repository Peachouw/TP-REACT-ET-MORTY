import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Router, RouterProvider } from "react-router-dom";
import { router } from ".";
import { auth, db } from "./firebase/firebase";
import { selectOnlineUser, setUserAuth, setUserEmail, setUserId, setUserName } from "./Store/OnlineUserReducer";

export default function App() {
    const [user, loading, error] = useAuthState(auth);
    const dispatch = useDispatch();
    const userOnline = useSelector(selectOnlineUser);
    const [isLoaded, setIsloaded] = useState(false);

    const fetchUserName = async () => {
        if(user){
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        console.log(data);
        dispatch(setUserName(data.name));
        dispatch(setUserEmail(data.email));
        dispatch(setUserAuth(data.authProvider));
        dispatch(setUserId(data.uid));
        console.log(userOnline);
    }
    setIsloaded(true);

    };

    useEffect(() => {
        if (loading) return;
        fetchUserName();
    }, [user, loading]);

    return isLoaded && <RouterProvider router={router} />;
}
