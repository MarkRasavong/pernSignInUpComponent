import axios from "axios";
import axiosRetry from "axios-retry";

const UserRegistration = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

axiosRetry(UserRegistration, { retries: 3 });

export default UserRegistration;