import { createSlice } from "@reduxjs/toolkit";
import { visaServicePayloads } from "./visaServicePayload";

const visaServiceSlice = createSlice({
    name: 'visaService',
    initialState: {
        visaServices: [],
        visaService: null,
        paginateParams: visaServicePayloads.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.visaServices = action.payload;
            return state;
        },
        update: (state, action) => {
            state.visaService = action.payload;
            return state;
        },
        show: (state, action) => {
            state.visaService = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = visaServiceSlice.actions;
export default visaServiceSlice.reducer;