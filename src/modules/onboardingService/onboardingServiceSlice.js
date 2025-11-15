import { createSlice } from "@reduxjs/toolkit";
import { onboardingServicePayloads } from "./onboardingServicePayloads";

const onboardingServiceSlice = createSlice({
    name: 'onboarding',
    initialState: {
        onboardingServices: [],
        onboardingService: null,
        onboardingServicePaginateParams: onboardingServicePayloads.onboardingServicePaginateParams,
        onboardingServiceCreateOrUpdateForm: onboardingServicePayloads.onboardingServiceCreateOrUpdate
    },

    reducers: {
        onboardingServiceIndex: (state, action) => {
            state.onboardingServices = action.payload;
            return state;
        },

        onboardingServiceUpdate: (state, action) => {
            state.onboardingService = action.payload;
            return state;
        },

        onboardingServiceShow: (state, action) => {
            state.onboardingService = action.payload;
            return state;
        },

        setOnboardingServicePaginate: (state, action) => {
            state.onboardingServicePaginateParams = action.payload;
            return state;
        },

        setOnboardingServiceCreateOrUpdateFrom: (state, action) => {
            state.onboardingServiceCreateOrUpdateForm = action.payload;
            return state;
        }
    }
});

export const { onboardingServiceIndex, onboardingServiceUpdate, onboardingServiceShow, setOnboardingServicePaginate, setOnboardingServiceCreateOrUpdateFrom } = onboardingServiceSlice.actions;
export default onboardingServiceSlice.reducer;