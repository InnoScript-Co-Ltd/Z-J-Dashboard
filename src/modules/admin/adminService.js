import { endpoints } from "../../constants/endpoints";
import { delRequest, formBuilderRequest, getRequest, postRequest, putRequest } from "../../utilities/api";
import { updateNotification } from "../shareSlice";
import { activities, index, show } from "./adminSlice";

export const adminServices = {
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.admin, params, dispatch);
        if(response.status === 200) {
            dispatch(index(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    delIndex: async (dispatch, params) => {
        const response = await getRequest(`${endpoints.admin}/trash`, params, dispatch);
        if(response.status === 200) {
            dispatch(index(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    store: async (dispatch, payload) => {
        return await postRequest(endpoints.admin, payload, dispatch);
    },

    show: async (dispatch , id) => {
        const response = await getRequest(`${endpoints.admin}/${id}`, null, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },

    update: async (dispatch, id, payload) => {
        const response = await putRequest(`${endpoints.admin}/${id}`, payload, dispatch);
        if(response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    },

    destroy: async (dispatch, id) => {
        const response = await delRequest(`${endpoints.admin}/${id}`, dispatch);
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

    approved: async (dispatch, id) => {
        const response = await putRequest(`${endpoints.admin}/approve/${id}`, {}, dispatch);
                if(response.status === 200) {
            await dispatch(updateNotification({
                show: true,
                severity: "success",
                summary: "Approved Successful",
                detail: response.message,
            }));
        }
        return response;
    },

    restore: async (dispatch, id) => {
        const response = await postRequest(`${endpoints.admin}/restore/${id}`, {}, dispatch);
                if(response.status === 200) {
            await dispatch(updateNotification({
                show: true,
                severity: "success",
                summary: "Restore Successful",
                detail: response.message,
            }));
        }
        return response;
    },

    activities: async (dispatch, params) => {
        const response = await getRequest(endpoints.activity, params, dispatch);
        if(response.status === 200) {
            dispatch(activities(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    resetPassword: async (dispatch, id, password) => {
        const response = await putRequest(`${endpoints.admin}/${id}`, { password: password}, dispatch);
        return response;
    }

}