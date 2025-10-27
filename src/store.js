import { configureStore } from '@reduxjs/toolkit';
import shareSlice from "./modules/shareSlice";
import resellerSlice from "./modules/reseller/resellerSlice";
import visaServiceSlice from "./modules/visaServices/visaServiceSlice";
import adminSlice from "./modules/admin/adminSlice";

export const store = configureStore({
    reducer: {
        share: shareSlice,
        reseller: resellerSlice,
        visaService: visaServiceSlice,
        admin: adminSlice
    },
});