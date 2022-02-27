import axios from "axios";
import axiosRetry from "axios-retry";

const PortalApi = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? "http://localhost:5000/api"
      : "https://thawing-sea-19132.herokuapp.com/api",
  timeout: 5000,
});

axiosRetry(PortalApi, { retries: 3 });

export default PortalApi;