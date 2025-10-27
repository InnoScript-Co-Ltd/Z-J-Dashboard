import { endpoints } from "../../constants/endpoints";
import { delRequest, formBuilderRequest, getRequest, postRequest } from "../../utilities/api";
import { updateNotification } from "../shareSlice";
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
        return await formBuilderRequest(endpoints.customer, payload, dispatch);
    },

    show: async (dispatch , id) => {
        const response = await getRequest(`${endpoints.customer}/${id}`, null, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },

    update: async (dispatch, id, payload) => {
        const response = await formBuilderRequest(`${endpoints.customer}/${id}`, payload, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },

    destroy: async (dispatch, id) => {
        const response = await delRequest(`${endpoints.customer}/${id}`, dispatch);
        if(response.status === 200) {
            await dispatch(updateNotification({
                show: true,
                severity: "success",
                summary: "Delete Successful",
                detail: response.message,
            }));
        }
        return response;
    },


    restore: async (dispatch, id) => {
        const response = await postRequest(`${endpoints.customer}/restore/${id}`, {}, dispatch);
                if(response.status === 200) {
            await dispatch(updateNotification({
                show: true,
                severity: "success",
                summary: "Restore Successful",
                detail: response.message,
            }));
        }
        return response;
    }
}