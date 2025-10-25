import { httpErrorHandler, httpResponseHandler } from "./handlers";
import http from "./axios";

const urlParams = (params) => {
  let paramsArray = [];
  Object.keys(params).map((value) => {
    return paramsArray.push(`${value}=${params[value]}`);
  });
  return paramsArray.join("&");
};

/**
 * Http get method request
 * @param {*} path
 * @param {*} params
 * @returns
 */
export const getRequest = async (path, params, dispatch) => {
  try {
    const url = params ? `${path}?${urlParams(params)}` : path;
    const result = await http.get(url);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error, dispatch);
  }
};

/**
 * Http post method request
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const postRequest = async (path, payload, dispatch) => {
  try {
    const result = await http.post(path, payload);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error, dispatch);
  }
};

/**
 * Http post method request for updating process include mutiple files or file
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const formBuilderRequest = async (path, payload, dispatch) => {
  try {
    const result = await http.put(path, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error, dispatch);
  }
};

/**
 * Http put method request
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const putRequest = async (path, payload, dispatch) => {
  try {
    const result = await http.put(path, payload);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error, dispatch);
  }
};

/**
 * Http delete method request
 * @param {*} path
 * @returns
 */
export const delRequest = async (path, dispatch) => {
  try {
    const result = await http.delete(path);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error);
  }
};