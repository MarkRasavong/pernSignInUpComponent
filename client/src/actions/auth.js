import PortalApi from '../apis/PortalApi';

export const registerUser = async (formData) => {
  try {
    const { data } = await PortalApi.post("/auth/create", formData);
    localStorage.setItem("profile", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const logUser = async (userCred) => {
  try {
    const { data } = await PortalApi.post("/auth/login", userCred);
    localStorage.setItem("profile", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}