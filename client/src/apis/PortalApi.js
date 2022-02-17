import axios from "axios";
import axiosRetry from "axios-retry";

const PortalApi = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

axiosRetry(PortalApi, { retries: 3 });

export default PortalApi;