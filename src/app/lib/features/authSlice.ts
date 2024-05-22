import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  user: {
    username: string;
    email: string;
    id: number;
    accessToken: string;
    refreshToken: string;
    roles: string[];
    imgUrl: string;
  };
}
interface AuthState {
  user: User | null | undefined;
  isFetching: boolean;
  error: boolean;
  success: boolean;
  errorMessage: string | null;
  registerErroorMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  isFetching: false,
  error: false,
  success: false,
  errorMessage: null,
  registerErroorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.user = { ...action.payload };
      state.error = false;
    },
    loginFalse: (state) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = "Email and password are incorrect";
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.user = { ...action.payload };
      state.success = true;
      state.error = false;
    },
    registerFalse: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
      state.registerErroorMessage = "name or email already exists";
    },
    logOutStart: (state) => {
      state.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.isFetching = false;
      state.user = null;
      state.error = false;
    },
    logOutFalse: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearAllData: () => initialState,
    updateAccessToken(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user = {
          ...state.user,
          user: {
            ...state.user.user,
            accessToken: action.payload,
          },
        };
      }
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state: { auth: any }) => state.auth;

export default authSlice;
