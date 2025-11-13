import { createSlice } from "@reduxjs/toolkit";
import { employerPayloads } from "./employerPayloads";

const employerSlice = createSlice({
    name: 'employer',
    initialState: {
        employers: [],
        employer: null,
        employerPaginateParams: employerPayloads.employerPaginateParams,
        employerCreateOrUpdateFrom: employerPayloads.employerCreateOrUpdate
    },

    reducers: {
        employerIndex: (state, action) => {
            state.employers = action.payload;
            return state;
        },

        employerUpdate: (state, action) => {
            state.employer = action.payload;
            return state;
        },

        employerShow: (state, action) => {
            state.employer = action.payload;
            return state;
        },

        setEmployerPaginate: (state, action) => {
            state.employerPaginateParams = action.payload;
            return state;
        },

        setEmployerCreateOrUpdateFrom: (state, action) => {
            state.employerCreateOrUpdateFrom = action.payload;
            return state;
        }
    }
});

export const { employerIndex, employerUpdate, employerShow, setEmployerPaginate, setEmployerCreateOrUpdateFrom } = employerSlice.actions;
export default employerSlice.reducer;