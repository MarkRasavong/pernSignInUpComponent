import UserRegistration from '../apis/UserRegistrationDB';
import { AUTH } from '../constants/actionTypes';

export const registerUser = (formData) => async (dispatch) => {
  try {
    const { data } = await UserRegistration.post("/users/create", formData);
    dispatch({ type: AUTH, data });
  } catch (err) {
    console.log(err);
  }
};

export const logUser = (userCred) => async (dispatch) => {
  try {
    const { data } = await UserRegistration.post("/users/login", userCred);
    dispatch({ type: AUTH, data });
  } catch (err) {
    console.log(err);
  }
}