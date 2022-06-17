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
  comment: (endpoint, params) => {
    const url = "comment/" + endpoint;
    return comicsAPI.post(url, params);
  },
};
