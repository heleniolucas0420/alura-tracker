import axios, { AxiosInstance } from "axios";

const httpAxios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/'
});

export default httpAxios;