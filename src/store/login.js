import { atom } from "recoil";
export const access_token = atom({
  key: "access_token", // unique ID (with respect to other atoms/selectors)
  default: "",
});

export const username = atom({
  key: "username", // unique ID (with respect to other atoms/selectors)
  default: "",
});
