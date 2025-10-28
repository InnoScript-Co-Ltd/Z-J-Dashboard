import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../utilities/api";
import { serviceIndex } from "./serviceSlice";

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

    serviceUpdate: async (dispatch) => {
        return await postRequest(endpoints.service, dispatch);
    },

    serviceShow: async (dispatch, id) => {
        return await getRequest(`${endpoints.service}/${id}`, {}, dispatch);
    }
}