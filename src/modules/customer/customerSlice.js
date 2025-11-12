import { createSlice } from "@reduxjs/toolkit";
import { customerPayloads } from "./customerPayloads";

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [],
        customer: null,
        customerPaginateParams: customerPayloads.customerPaginateParams,
        customerCreateForm: customerPayloads.customerCreateOrUpdate,
        customerUpdateForm: customerPayloads.customerCreateOrUpdate
    },
    reducers: {
        customerIndex: (state, action) => {
            state.customers = action.payload;
            return state;
        },

        customerUpdate: (state, action) => {
            state.customer = action.payload;
            state.customerUpdateForm = action.payload;
            return state;
        },

        setCustomerPaginate: (state, action) => {
            state.customerPaginateParams = action.payload;
            return state;
        },

        setCreateCustomerForm: (state, action) => {
            state.customerCreateForm = action.payload;
            return state;
        },

        setUpdateCustomerForm: (state, action) => {
            state.customerUpdateForm = action.payload;
            return state;
        }
    }
});

export const { customerIndex, customerUpdate, setCustomerPaginate, setCreateCustomerForm, setUpdateCustomerForm } = customerSlice.actions;
export default customerSlice.reducer;