import { createSlice } from "@reduxjs/toolkit";

export const onlineUserSlice = createSlice({
    name: "onlineUser",
    initialState: {
        value: { userId: 0, userName: "", userEmail: "", userAuth: "" },
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
        unlogUser: (state) => {
            state.value = { userId: 0, userName: "", userEmail: "", userAuth: "" };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUserAuth, setUserEmail, setUserId, setUserName, unlogUser } = onlineUserSlice.actions;

export const selectOnlineUser = (state) => state.onlineUser.value

export default onlineUserSlice.reducer;
