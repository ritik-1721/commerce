import { retrieveAuthToken } from "@/utils/auth";

const defaultHeaders = {
  Accept: "application/json",
  "Access-Control-Allow-Origin": "http://localhost:1000",
};

const createFetchRequest = async (
  url,
  method,
  body = null,
  requireAuthorization = false
) => {
  const authToken = requireAuthorization ? `Bearer ${retrieveAuthToken()}` : "";
  const headers = requireAuthorization
    ? { ...defaultHeaders, Authorization: authToken }
    : { ...defaultHeaders };
  const requestOptions = {
    method,
    headers,
    body,
  };

  try {
    const response = await fetch(url, requestOptions);
    // if (!response.ok) {
    //   // throw new Error("Network response was not ok");
    // }
    return response;
  } catch (error) {
    // Handle the error here, you can log it or perform other actions
    console.error("An error occurred during the fetch operation:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};

export const fetchGet = async (url, requireAuthorization = false) => {
  return await createFetchRequest(url, "GET", null, requireAuthorization);
};

export const fetchPost = async (url, body, requireAuthorization = false) => {
  return await createFetchRequest(url, "POST", body, requireAuthorization);
};

export const fetchUpdate = async (url, body, requireAuthorization = false) => {
  return await createFetchRequest(url, "PUT", body, requireAuthorization);
};

export const fetchDelete = async (url, requireAuthorization = false) => {
  return await createFetchRequest(url, "DELETE", null, requireAuthorization);
};
