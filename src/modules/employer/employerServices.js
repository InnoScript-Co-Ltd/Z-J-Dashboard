import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../utilities/api";
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
        return await postRequest(endpoints.employer, payload, dispatch);
    },

    employerServiceUpdate: async (dispatch, payload, id) => {
        return await putRequest(`${endpoints.employer}/${id}`, payload, dispatch);
    },

    employerServiceShow: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.employer}/${id}`, {}, dispatch);
        if(response.status === 200) {
            dispatch(employerUpdate(response.data));
        }
        return response;
    },
}