import { createSlice } from "@reduxjs/toolkit";
import { settingPayloads } from "./settingPayloads";

const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        services: [],
        service: null,
        servicePaginateParams: settingPayloads.servicePaginateParams,
        categories: [],
        category: null,
        categoryPaginateParams: settingPayloads.categoryPaginateParams
    },
    reducers: {
        serviceIndex: (state, action) => {
            state.services = action.payload;
            return state;
        },

        serviceUpdate: (state, action) => {
            state.service = action.payload;
            return state;
        },

        serviceShow: (state, action) => {
            state.service = action.payload;
            return state;
        },

        setServicePaginate: (state, action) => {
            state.servicePaginateParams = action.payload;
            return state;
        },

        categoryIndex: (state, action) => {
            state.categories = action.payload;
            return state;
        },

        categoryUpdate: (state, action) => {
            state.category = action.payload;
            return state;
        },

        categoryShow: (state, action) => {
            state.category = action.payload;
            return state;
        },

        setCategoryPaginate: (state, action) => {
            state.categoryPaginateParams = action.payload;
            return state;
        },
    }
});

export const { serviceIndex, serviceUpdate, serviceShow, setServicePaginate, setCategoryPaginate, categoryShow, categoryUpdate, categoryIndex } = settingSlice.actions;
export default settingSlice.reducer;