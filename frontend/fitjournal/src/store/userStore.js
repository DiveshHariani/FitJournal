import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

const userStore = configureStore({
    reducer: {userReducer: userReducer}
});

export default userStore;