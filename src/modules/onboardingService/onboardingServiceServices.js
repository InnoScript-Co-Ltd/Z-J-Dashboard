import { endpoints } from "../../constants/endpoints";
import { formBuilderRequest, getRequest, postRequest } from "../../utilities/api";
import { onboardingServiceIndex, onboardingServiceUpdate } from "./onboardingServiceSlice";



export const onboardingServiceServices = {
    onboardingServiceIndex: async (dispatch, params) => {
        const response = await getRequest(endpoints.onboarding, params, dispatch);
        if(response.status === 200) {
            dispatch(onboardingServiceIndex(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    onboardingServiceStore: async (dispatch, payload) => {
        return await postRequest(endpoints.onboarding, payload, dispatch);
    },

    onboardingServiceUpdate: async (dispatch, payload, id) => {
        return await formBuilderRequest(`${endpoints.onboarding}/${id}`, payload, dispatch);
    },

    onboardingServiceShow: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.onboarding}/${id}`, null, dispatch);
        if(response.status === 200) {
            dispatch(onboardingServiceUpdate(response.data));
        }
        return response;
    },
}