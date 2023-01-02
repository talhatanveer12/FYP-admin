import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice";
import themeSlice from "./Theme/themeSlice";


const store  = configureStore({
    reducer : {
        Theme: themeSlice.reducer,
        Auth: authSlice.reducer,
    }
})

export default store;