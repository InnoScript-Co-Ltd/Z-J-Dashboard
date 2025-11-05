import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../utilities/api";
import { categoryIndex, categoryUpdate, serviceIndex, serviceUpdate } from "./settingSlice";

export const settingServices = {
    serviceIndex: async (dispatch, params) => {
        const response = await getRequest(endpoints.service, params, dispatch);
        if(response.status === 200) {
            dispatch(serviceIndex(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    serviceStore: async (dispatch, payload) => {
        return await postRequest(endpoints.service, payload, dispatch);
    },

    serviceUpdate: async (dispatch, payload, id) => {
        return await putRequest(`${endpoints.service}/${id}`, payload, dispatch);
    },

    serviceShow: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.service}/${id}`, {}, dispatch);
        if(response.status === 200) {
            dispatch(serviceUpdate(response.data));
        }
        return response;
    },

    categoryIndex: async (dispatch, params) => {
        const response = await getRequest(endpoints.categories, params, dispatch);
        if(response.status === 200) {
            dispatch(categoryIndex(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    categoryStore : async (dispatch, payload) => {
        return postRequest(endpoints.categories, payload, dispatch);
    },

    categoryUpdate: async (dispatch, payload, id) => {
        return await putRequest(`${endpoints.categories}/${id}`, payload, dispatch);
    },

    categoryShow: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.categories}/${id}`, {}, dispatch);
        if(response.status === 200) {
            dispatch(categoryUpdate(response.data));
        }
        return response;
    },
}