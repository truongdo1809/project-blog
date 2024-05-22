import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import authSlice from "./features/authSlice";
import { privateRequest, publicRequest } from "./createInstance";
import { toast } from "react-toastify";

export const loginUser = async (
  user: { username: string; password: string },
  dispatch: Dispatch<UnknownAction>
  // router: AppRouterInstance | string[]
) => {
  dispatch(authSlice.actions.loginStart());
  try {
    const res = await publicRequest("post", "/auth/login", user);
    dispatch(authSlice.actions.loginSuccess(res.data));
    toast.success("login success!");
  } catch (error) {
    dispatch(authSlice.actions.loginFalse());
    toast.error("login failed try again!");
  }
};
export const registerUser = async (
  user: { username: string; password: string; email: string },
  dispatch: Dispatch<UnknownAction>,
  router: AppRouterInstance | string[]
) => {
  dispatch(authSlice.actions.registerStart());
  try {
    const res = await publicRequest("post", "/auth/register", user);
    dispatch(authSlice.actions.registerSuccess(res.data));
    toast.success("register successfully!");

    router.push("/");
  } catch (error) {
    dispatch(authSlice.actions.registerFalse());
    toast.error("register failed try again!");
  }
};
export const logOut = async (
  dispatch: Dispatch<UnknownAction>,
  router: AppRouterInstance | string[]
) => {
  dispatch(authSlice.actions.logOutStart());

  try {
    await privateRequest("post", "/auth/logout");
    dispatch(authSlice.actions.logOutSuccess());
    toast.success("logout successfully!");

    router.push("/login");
  } catch (err) {
    dispatch(authSlice.actions.logOutFalse());
    toast.error("logout failed try again!");
  }
};
