import { endpoints } from "../../constants/endpoints";
import { delRequest, getRequest, postRequest, putRequest } from "../../utilities/api";
import { categoryServiceIndex, categoryServiceUpdate } from "./categoryServiceSlice";

export const categoryServiceServices = {
    categoryServiceIndex: async (dispatch, params) => {
        const response = await getRequest(endpoints.categoryService, params, dispatch);
        if(response.status === 200) {
            dispatch(categoryServiceIndex(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    categoryServiceStore : async (dispatch, payload) => {
        return postRequest(endpoints.categoryService, payload, dispatch);
    },

    categoryServiceUpdate: async (dispatch, payload, id) => {
        return await putRequest(`${endpoints.categoryService}/${id}`, payload, dispatch);
    },

    categoryServiceShow: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.categoryService}/${id}`, {}, dispatch);
        if(response.status === 200) {
            dispatch(categoryServiceUpdate(response.data));
        }
        return response;
    },

    categoryServiceDestroy: async (dispatch, id) => {
        const response = await delRequest(`${endpoints.categoryService}/${id}`, dispatch);
        return response;
    }
}