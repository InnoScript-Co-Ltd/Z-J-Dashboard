import { createSlice } from "@reduxjs/toolkit";
import { categoryServicePayloads } from "./categoryServicePayloads";

const categoryServiceSlice = createSlice({
    name: 'categoryService',
    initialState: {
        categoryServices: [],
        categoryService: null,
        categoryServicePaginateParams: categoryServicePayloads.categoryServicePaginateParams,
        categoryServiceCreateForm: categoryServicePayloads.categoryServiceCreateOrUpdate
    },
    reducers: {
        categoryServiceIndex: (state, action) => {
            state.categoryServices = action.payload;
            return state;
        },

        categoryServiceUpdate: (state, action) => {
            state.categoryService = action.payload;
            return state;
        },

        setCategoryServicePaginate: (state, action) => {
            state.categoryServicePaginateParams = action.payload;
            return state;
        },

        setCategoryServiceCreateFrom: (state, action) => {
            state.categoryServiceCreateForm = action.payload;
            return state;
        }
    }
});

export const { categoryServiceIndex, categoryServiceUpdate, setCategoryServicePaginate, setCategoryServiceCreateFrom } = categoryServiceSlice.actions;
export default categoryServiceSlice.reducer;