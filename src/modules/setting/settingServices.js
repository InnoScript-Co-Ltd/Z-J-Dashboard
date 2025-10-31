import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../utilities/api";
import { serviceIndex, serviceUpdate } from "./settingSlice";

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
    }
}