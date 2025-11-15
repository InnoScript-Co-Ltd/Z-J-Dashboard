import { endpoints } from "../../constants/endpoints";
import { formBuilderRequest, getRequest } from "../../utilities/api";
import { employerIndex, employerUpdate } from "./employerSlice";

export const employerServices = {
    employerServiceIndex: async (dispatch, params) => {
        const response = await getRequest(endpoints.employer, params, dispatch);
        if(response.status === 200) {
            dispatch(employerIndex(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    employerServiceStore: async (dispatch, payload) => {
        return await formBuilderRequest(endpoints.employer, payload, dispatch);
    },

    employerServiceUpdate: async (dispatch, payload, id) => {
        return await formBuilderRequest(`${endpoints.employer}/${id}`, payload, dispatch);
    },

    employerServiceShow: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.employer}/${id}`, null, dispatch);
        if(response.status === 200) {
            dispatch(employerUpdate(response.data));
        }
        return response;
    },
}