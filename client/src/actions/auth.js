import UserRegistration from '../apis/UserRegistrationDB';
import { AUTH } from '../constants/actionTypes';

export const registerUser = (formData, nav) => async (dispatch) => {
  try {
    const { data } = await UserRegistration.post("/users/create", formData);
    dispatch({ type: AUTH, data });
    nav("/user");
  } catch (err) {
    console.log(err);
  }
}