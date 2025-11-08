import { endpoints } from "../../constants/endpoints";
import { delRequest, getRequest, postRequest, putRequest } from "../../utilities/api";
import { categoryIndex, categoryUpdate } from "./categorySlice";

export const categoryServices = {
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

    categoryDestroy: async (dispatch, id) => {
        const response = await delRequest(`${endpoints.categories}/${id}`, dispatch);
        return response;
    }
}