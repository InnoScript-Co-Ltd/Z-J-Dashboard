import { endpoints } from "../../constants/endpoints";
import { delRequest, formBuilderRequest, getRequest, postRequest } from "../../utilities/api";
import { customerIndex, customerUpdate } from "./customerSlice";

export const customerServices = {
    customerIndex: async (dispatch, params) => {
        const response = await getRequest(endpoints.customer, params, dispatch);
        if(response.status === 200) {
            dispatch(customerIndex(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    customerStore: async (dispatch, payload) => {
        return await formBuilderRequest(endpoints.customer, payload, dispatch);
    },

    customerShow: async (dispatch , id) => {
        const response = await getRequest(`${endpoints.customer}/${id}`, null, dispatch);
        if(response.status === 200) {
            dispatch(customerUpdate(response.data));
        }
        return response;
    },

    customerUpdate: async (dispatch, id, payload) => {
        const response = await formBuilderRequest(`${endpoints.customer}/${id}`, payload, dispatch);
        if(response.status === 200) {
            dispatch(customerUpdate(response.data));
        }
        return response;
    },

    customerDestroy: async (dispatch, id) => {
        const response = await delRequest(`${endpoints.customer}/${id}`, dispatch);
        return response;
    },

    customerRestore: async (dispatch, id) => {
        const response = await postRequest(`${endpoints.customer}/restore/${id}`, {}, dispatch);
        return response;
    }
}