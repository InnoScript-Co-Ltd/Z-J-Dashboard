import { endpoints } from "../../constants/endpoints";
import { formBuilderRequest, getRequest, putRequest } from "../../utilities/api";
import { index, show } from "./visaServiceSlice";

export const visaServiceServices = {
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.visaService, params, dispatch);
        if(response.status === 200) {
            dispatch(index(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    store: async (dispatch, payload) => {
        const response = await formBuilderRequest(endpoints.visaService, payload, dispatch);
        return response;
    },

    show: async (dispatch , id) => {
        const response = await getRequest(`${endpoints.visaService}/${id}`, null, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },

    update: async (dispatch, id, payload) => {
        const response = await putRequest(`${endpoints.visaService}/${id}`, payload, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },
}