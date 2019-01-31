import axios from "axios";

export const convertImage = (file, type, name) => {
  const data = new FormData();
  data.append("file", file);
  data.append("type", type);
  data.append("name", name);

  return axios.post("/files/convert-file", data, {
    headers: {
      "Content-Type": file.type
    },
    withCredentials: false
  });
};

export const convertUrl = (type, name, url) =>
  axios.post("/files/convert-url", { type, name, url });

export const convertYoutube = (url, name, type) =>
  axios.post("/files/convert-youtube", { url, name, type });

export const createThumbnail = file => {
  const data = new FormData();
  data.append("thumbnail", file);
  return axios.post("/files/create-url/thumbnail", data, {
    headers: {
      "Content-Type": file.type
    },
    withCredentials: false
  });
};
