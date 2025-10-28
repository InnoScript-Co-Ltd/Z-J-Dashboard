import { configureStore } from '@reduxjs/toolkit';
import shareSlice from "./modules/shareSlice";
import visaServiceSlice from "./modules/visaServices/visaServiceSlice";
import adminSlice from "./modules/admin/adminSlice";
import customerSlice from "./modules/customer/customerSlice";
import serviceSlice from "./modules/setting/serviceSlice";

export const store = configureStore({
    reducer: {
        share: shareSlice,
        visaService: visaServiceSlice,
        admin: adminSlice,
        customer: customerSlice,
        setting: serviceSlice
    },
});