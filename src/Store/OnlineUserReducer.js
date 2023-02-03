import { createSlice } from "@reduxjs/toolkit";

export const onlineUserSlice = createSlice({
    name: "onlineUser",
    initialState: {
        value: { userId: 0, userName: "", userEmail: "", userAuth: "", userFavs :[] },
    },
    reducers: {
        setUserId: (state, action) => {
            state.value.userId = action.payload;
        },
        setUserName: (state, action) => {
            state.value.userName = action.payload;
        },
        setUserEmail: (state, action) => {
            state.value.userEmail = action.payload;
        },
        setUserAuth: (state, action) => {
            state.value.userAuth = action.payload;
        },
        setUserFavs:(state,action)=>{
            state.value.userFavs = action.payload;
        },
        unlogUser: (state) => {
            state.value = { userId: 0, userName: "", userEmail: "", userAuth: "" };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUserAuth, setUserEmail, setUserId, setUserName, unlogUser, setUserFavs } = onlineUserSlice.actions;

export const selectOnlineUser = (state) => state.onlineUser.value

export default onlineUserSlice.reducer;
