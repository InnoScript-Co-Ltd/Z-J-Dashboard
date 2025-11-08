import { createSlice } from "@reduxjs/toolkit";
import { categoryPayloads } from "./categoryPayloads";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        category: null,
        categoryPaginateParams: categoryPayloads.categoryPaginateParams,
        createForm: categoryPayloads.categoryCreateOrUpdate
    },
    reducers: {
        categoryIndex: (state, action) => {
            state.categories = action.payload;
            return state;
        },

        categoryUpdate: (state, action) => {
            state.category = action.payload;
            return state;
        },

        setCategoryPaginate: (state, action) => {
            state.categoryPaginateParams = action.payload;
            return state;
        },

        setcreateFrom: (state, action) => {
            state.createForm = action.payload;
            return state;
        }
    }
});

export const { categoryIndex, categoryUpdate, setCategoryPaginate, setcreateFrom } = categorySlice.actions;
export default categorySlice.reducer;