import { configureStore } from '@reduxjs/toolkit';
import onlineUserReducer from './OnlineUserReducer'

export const store = configureStore({
  reducer: {
    onlineUser : onlineUserReducer,
  },
});

export default store;