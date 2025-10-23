import { updateError, updateNotification } from "../modules/shareSlice";

/**
 * Payload handler for update state
 * @param {*} payload
 * @param {*} value
 * @param {*} field
 * @param {*} fn
 */
export const payloadHandler = (payload, value, field, fn) => {
  let updatePayload = { ...payload };
  updatePayload[field] = value;
  fn(updatePayload);
};

/**
 * Http error handler for api call
 * @param {*} error
 * @returns
 */
export const httpErrorHandler = async (error, dispatch) => {
    await dispatch(updateError(null));

    if (error.code === "ERR_NETWORK") {
        return {
        message: error.message,
        status: 0,
        notification: {
            show: true,
            summary: "Network Error!",
            severity: "error",
            detail: "Please check internet connection",
        },
        };
    }

    const { status, data } = error.response;

    if(status === 422) {
        await dispatch(updateError(data));
    }

    if(status === 404 || status === 400) {
        await dispatch(updateNotification({
            show: true,
            severity: "warn",
            summary: "Error Message",
            detail: data.message,
        }))
    }

    if(status === 401) {
      localStorage.clear();
      window.location.replace("/login");
    }
  
  return error;
};

/**
 * Http response handler for api call
 * @param {*} result
 * @returns
 */
export const httpResponseHandler = (result) => {
  return {
    status: result.status,
    data: result.data.data,
    message: result.data.message,
  };
};

/**
 * Http status handler from service
 * @param {*} dispatch
 * @param {*} result
 * @returns
 */
export const httpServiceHandler = async (dispatch, result) => {
  await dispatch(updateError(null));
  if (
    result.status === 400 ||
    result.status === 0 ||
    result.status === 500 ||
    result.status === 404 ||
    result.status === 403
  ) {
    await dispatch(updateNotification(result.notification));
  }

  if (result.status === 422) {
    await dispatch(updateError(result.error));
  }

  return result;
};