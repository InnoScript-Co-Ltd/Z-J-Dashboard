import { endpoints } from "../../constants/endpoints";
import { formBuilderRequest, getRequest, putRequest } from "../../utilities/api";
import { index, show } from "./customerSlice";

export const customerServices = {
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.customer, params, dispatch);
        if(response.status === 200) {
            dispatch(index(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    store: async (dispatch, payload) => {
        const response = await formBuilderRequest(endpoints.customer, payload, dispatch);
        return response;
    },

    show: async (dispatch , id) => {
        const response = await getRequest(`${endpoints.customer}/${id}`, null, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },

    update: async (dispatch, id, payload) => {
        const response = await putRequest(`${endpoints.customer}/${id}`, payload, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },

    resetPassword: async (dispatch, id, password) => {
        const response = await putRequest(`${endpoints.customer}/${id}`, { password: password}, dispatch);
        return response;
    }

}