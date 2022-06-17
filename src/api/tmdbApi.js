import axiosClient, { comicsAPI } from "./axiosClient";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const categoryComics = {
  topyear: "topyear",
  topmonth: "topmonth",
  topday: "topday",
  toprating: "toprating",
  topsearch: "topsearch",
  lastupdate: "lastupdate",
  relate: "relate",
  history: "history",
  bookfollow: "bookfollow",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  on_the_air: "on_the_air",
  popular: "popular",
  top_rated: "top_rated",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = "search/" + category[cate];
    console.log(url);
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  cast: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
};

export const comics = {
  getTopYear: () => {
    const url = "book/" + "top-view-year";
    return comicsAPI.get(url);
  },
  getTopMonth: () => {
    const url = "book/" + "top-view-month";
    return comicsAPI.get(url);
  },
  getLastUpdate: () => {
    const url = "book/" + "top-last-update";
    return comicsAPI.get(url);
  },
  getTopDay: () => {
    const url = "book/" + "top-view-day";
    return comicsAPI.get(url);
  },
  getTopSearch: () => {
    const url = "book/" + "top-search";
    return comicsAPI.get(url);
  },
  getTopRating: () => {
    const url = "book/" + "top-rating";
    return comicsAPI.get(url);
  },
  getBookFollowing: (config) => {
    const url = "/user/book-following";
    return comicsAPI.get(url, config);
  },
  getHistory: (config) => {
    const url = "/user/history";
    return comicsAPI.get(url, config);
  },
  detail: (endpoint) => {
    const url = "book/detail/" + endpoint;
    return comicsAPI.get(url);
  },
  relate: (endpoint) => {
    const url = "book/relate-book/" + endpoint;
    return comicsAPI.get(url);
  },
  getAll: (page) => {
    const url = "/book/all?page=" + page;
    return comicsAPI.get(url);
  },
  search: (params) => {
    const url = "book/all?page=1&filter=" + `{"title":"${params.title}"}`;
    return comicsAPI.get(url);
  },
  chapter: (endpoint) => {
    const url = `chapter/all/${endpoint}`;
    return comicsAPI.get(url);
  },
};

export default tmdbApi;
