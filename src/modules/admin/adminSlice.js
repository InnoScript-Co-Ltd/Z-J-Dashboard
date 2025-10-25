import { createSlice } from "@reduxjs/toolkit";
import { adminPayloads } from "./adminPayloads";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admins: [],
        admin: null,
        paginateParams: adminPayloads.paginateParams,
        activityPaginateParams: adminPayloads.activityPaginateParams,
        activities: []
    },
    reducers: {
        index: (state, action) => {
            state.admins = action.payload;
            return state;
        },

        update: (state, action) => {
            state.admin = action.payload;
            return state;
        },

        show: (state, action) => {
            state.admin = action.payload;
            return state;
        },

        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },

        activities: (state, action) => {
            state.activities = action.payload;
            return state;
        },

        setActivityPaginate: (state, action) => {
            state.activityPaginateParams = action.payload;
            return state;
        },
    }
});

export const { index, update, show, setPaginate, setActivityPaginate, activities } = adminSlice.actions;
export default adminSlice.reducer;