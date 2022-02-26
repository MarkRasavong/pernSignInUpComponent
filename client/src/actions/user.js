import PortalApi from '../apis/PortalApi';
import { FETCH_USER } from '../constants/actionTypes';

export const fetchUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await PortalApi.get(`users/user/${userId}`);

    dispatch({ type: FETCH_USER, payload: data });
  } catch (err) {
    console.log(err);
  }
}