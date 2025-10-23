import { createSlice } from "@reduxjs/toolkit";
import { customerPayloads } from "./customerPayload";

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [],
        customer: null,
        paginateParams: customerPayloads.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.customers = action.payload;
            return state;
        },
        update: (state, action) => {
            state.customer = action.payload;
            return state;
        },
        show: (state, action) => {
            state.customer = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = customerSlice.actions;
export default customerSlice.reducer;