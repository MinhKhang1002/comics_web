import axiosClient, { comicsAPI } from "./axiosClient";

export const loginApi = {
  getToken: (params) => {
    const url = "/user/login";
    return comicsAPI.post(url, params);
  },
  signUp: (params) => {
    const url = "/user/register";
    return comicsAPI.post(url, params);
  },
};
