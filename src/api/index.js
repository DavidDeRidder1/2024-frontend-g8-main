import axiosRoot from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export async function getAll(url) {
  const { data } = await axios.get(`/${url}`);

  return data;
}

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios({
    method: id ? "PUT" : "POST",
    url: `/${url}${id ?? ""}`,
    data: values,
  });
};

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};

export const post = async (url, { arg }) => {
  const { data } = await axios.post(`/${url}`, arg);
  console.log(data);
  return data;
};

export const getById = async (url) => {
  const { data } = await axios.get(`${url}`);

  return data;
};

export const put = async (url) => {
  await axios.put(`/${url}`);
}

export const readNotification = async (url, {arg: id}) => {
  await axios.put(`/${url}/${id}/lees`);
}