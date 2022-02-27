import PortalApi from '../apis/PortalApi';
import { AUTH } from '../constants/actionTypes';

export const registerUser = (formData) => async (dispatch) => {
  try {
    const { data } = await PortalApi.post("/auth/create", formData);
    localStorage.setItem("profile", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const logUser = (userCred) => async (dispatch) => {
  try {
    const { data } = await PortalApi.post("/auth/login", userCred);
    localStorage.setItem("profile", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}