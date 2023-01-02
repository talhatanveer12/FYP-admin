import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'English'
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state,action) => {
            state.mode = state.mode === 'English' ? 'Urdu' : 'English';
        }
    }
})

export default themeSlice;
export const {setTheme} = themeSlice.actions;