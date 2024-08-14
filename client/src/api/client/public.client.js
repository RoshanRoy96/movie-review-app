import axios from "axios";
import queryString from "query-string";

// const baseURL = "https://hlott-backend.vercel.app/api/v1/";
const baseURL = "http://localhost:5000/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

publicClient.interceptors.request.use(async config => {
  // console.log(config);
  return {
    ...config,
    headers: {
      "Content-Type": "application/json"
    }
  };
});

publicClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default publicClient;
