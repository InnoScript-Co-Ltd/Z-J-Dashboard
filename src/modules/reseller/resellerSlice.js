import { createSlice } from "@reduxjs/toolkit";
import { resellerPayloads } from "./resellerPayload";

const resellerSlice = createSlice({
    name: 'reseller',
    initialState: {
        resellers: [],
        reseller: null,
        paginateParams: resellerPayloads.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.resellers = action.payload;
            return state;
        },
        update: (state, action) => {
            state.reseller = action.payload;
            return state;
        },
        show: (state, action) => {
            state.reseller = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = resellerSlice.actions;
export default resellerSlice.reducer;