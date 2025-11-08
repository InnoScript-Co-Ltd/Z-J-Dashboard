import { configureStore } from '@reduxjs/toolkit';
import shareSlice from "./modules/shareSlice";
import visaServiceSlice from "./modules/visaServices/visaServiceSlice";
import adminSlice from "./modules/admin/adminSlice";
import customerSlice from "./modules/customer/customerSlice";
import settingSlice from "./modules/setting/settingSlice";
import categorySlice from "./modules/categories/categorySlice";
import categoryServiceSlice from "./modules/categoryService/categoryServiceSlice";

export const store = configureStore({
    reducer: {
        share: shareSlice,
        visaService: visaServiceSlice,
        admin: adminSlice,
        customer: customerSlice,
        setting: settingSlice,
        category: categorySlice,
        categoryService: categoryServiceSlice
    },
});