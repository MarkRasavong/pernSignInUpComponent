import { FETCH_USER } from "../constants/actionTypes";

const authReducer = (state = { fetchedUser: null }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, fetchedUser: action.payload };
    default:
      return state;
  }
}

export default authReducer;