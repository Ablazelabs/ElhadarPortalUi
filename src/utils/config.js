import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
const headers = {
    "access-control-allow-origin": "*",
    "content-type": "application/json",
    Authorization: `bearer ${localStorage.getItem("accessToken")}`,
};
// const baseURL = "http://localhost:2222/api";
const baseURL = "https://localhost:2222/api";
const refreshURL = "/refresh-token";
const axiosInstance = axios.create({
    baseURL,
    headers,
});

axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(localStorage.getItem("accessToken"));
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 100000;
    const refreshToken = localStorage.getItem("refreshToken");
    if (isExpired) {
        axios.post(baseURL + refreshURL, { refreshToken }).then((res) => {
            localStorage.setItem("accessToken", res.data?.accessToken);
        });
    }
    return req;
});
export const axiosPost = async (url, body, auth = false) => {
    const usedAxios = auth ? axiosInstance : axios;
    const newHeaders = auth
        ? undefined
        : { ...headers, Authorization: undefined };
    const sentUrl = auth ? url : baseURL + url;
    try {
        return await usedAxios.post(sentUrl, body, newHeaders);
    } catch ({ response }) {
        if (response.status === 400) {
            throw response.data;
        } else {
            return false;
        }
    }
};
export const axiosGet = async (url, body, auth = false) => {
    const usedAxios = auth ? axiosInstance : axios;
    const newHeaders = auth ? {} : { ...headers, Authorization: undefined };
    const sentUrl = auth ? url : baseURL + url;
    try {
        return await usedAxios.get(sentUrl, { params: body }, newHeaders);
    } catch (e) {
        console.log(e);
        return false;
    }
};
export const axiosPatch = async (url, body, auth = false) => {
    const usedAxios = auth ? axiosInstance : axios;
    const newHeaders = auth
        ? undefined
        : { ...headers, Authorization: undefined };
    const sentUrl = auth ? url : baseURL + url;
    try {
        return await usedAxios.patch(sentUrl, body, newHeaders);
    } catch ({ response }) {
        if (response.status === 400) {
            throw response.data;
        } else {
            return false;
        }
    }
};
