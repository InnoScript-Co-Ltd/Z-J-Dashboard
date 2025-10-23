import { configureStore } from '@reduxjs/toolkit';
import shareSlice from "./modules/shareSlice";
import resellerSlice from "./modules/reseller/resellerSlice";
import customerSlice from "./modules/customer/customerSlice";

export const store = configureStore({
    reducer: {
        share: shareSlice,
        reseller: resellerSlice,
        customer: customerSlice
    },
});