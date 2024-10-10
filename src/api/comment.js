import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const addComment = async (data) => {
  return await authorize.post("comment", data);
};

export const viewComment = async (videoCode) => {
  return await instance.get(`video/${videoCode}/comment`);
};
