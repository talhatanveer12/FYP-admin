import axiosInstance from "../../Http-Request/axios-instance";
import { login, profile } from "./authSlice";

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    if (res.data.status === "Login") {
      dispatch(login({ token: res.data.token}));
    }
    return res;
  } catch (error) {
    return error.response;
  }
};

export const loadUser = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/auth/me');
        if(res.data) {
            dispatch(profile(res.data));
        }
    } catch (error) {
        
    }
}
