import { createSlice } from "@reduxjs/toolkit";
import { CURRENT_LANG, currentLang } from "../constants/settings";

const utilitySlice = createSlice({
    name: "utilitySlice",
    initialState: {
        lang: currentLang
    },
    reducers: {
        setLang: (state, action) => {
            localStorage.setItem(CURRENT_LANG, action.payload);
            state.lang = action.payload;
            return state;
        }
    }
});