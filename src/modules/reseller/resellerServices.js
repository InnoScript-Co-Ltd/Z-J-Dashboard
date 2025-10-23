import { endpoints } from "../../constants/endpoints";
import { getRequest, putRequest } from "../../utilities/api";
import { index, show } from "./resellerSlice";

export const resellerServices = {
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.reseller, params, dispatch);
        if(response.status === 200) {
            dispatch(index(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    show: async (dispatch , id) => {
        const response = await getRequest(`${endpoints.reseller}/${id}`, null, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },

    update: async (dispatch, id, payload) => {
        const response = await putRequest(`${endpoints.reseller}/${id}`, payload, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },

    resetPassword: async (dispatch, id, password) => {
        const response = await putRequest(`${endpoints.reseller}/${id}`, { password: password}, dispatch);
        return response;
    }

}