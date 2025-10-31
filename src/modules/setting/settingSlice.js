import { createSlice } from "@reduxjs/toolkit";
import { settingPayloads } from "./settingPayloads";

const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        services: [],
        service: null,
        servicePaginateParams: settingPayloads.servicePaginateParams,
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
        }
    }
});

export const { serviceIndex, serviceUpdate, serviceShow, setServicePaginate } = settingSlice.actions;
export default settingSlice.reducer;