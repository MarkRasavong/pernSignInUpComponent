import { FETCH_USER, UPDATE } from "../constants/actionTypes";

const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload };
    case UPDATE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default authReducer;