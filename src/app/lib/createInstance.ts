import { jwtDecode } from "jwt-decode";
import axios, { AxiosRequestConfig, Method } from "axios";

// import { message as $message } from "antd";
import { convertAuthDataFromLocalStorage } from "~/utils/tokenTranform";
import { useDispatch } from "react-redux";
import authSlice from "./features/authSlice";

const refreshToken = async (refreshToken: string) => {
  try {
    const res = await axios.post(
      "https://news-api.toolhub.asia/auth/refresh-token",
      { refreshToken: refreshToken }
    );

    return res.data.accessToken;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Tạo một instance của axios cho public request
const publicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Sử dụng base URL của public API
  timeout: 6000,
});

// Tạo một instance của axios cho private request
const privateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Sử dụng base URL của private API
  timeout: 6000,
});

// Interceptor cho private request
privateAxiosInstance.interceptors.request.use(
  async (config) => {
    let date = new Date();
    const tokens = convertAuthDataFromLocalStorage() as any;
    if (!tokens) {
      window.location.href = "/login";
      console.log("Không tìm thấy dữ liệu auth trong localStorage");
      return config;
    }

    const decodedToken = jwtDecode(tokens?.accessToken);

    // Nếu token hết hạn và là private request
    if (
      decodedToken &&
      decodedToken.exp &&
      decodedToken.exp < date.getTime() / 1000
    ) {
      //
      try {
        const newAccessToken = await refreshToken(tokens.refreshToken);

        localStorage.setItem("accessToken", newAccessToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        window.location.href = "/login";
        return Promise.reject("Failed to refresh access token");
      }
    } else {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },
  (err) => {
    console.log(err);
    if (err.response.status === 401) {
      const dispatch = useDispatch();
      dispatch(authSlice.actions.clearAllData());
      window.localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Interceptor cho response của cả hai loại request
const responseInterceptor = (config: any) => {
  // if (config?.data?.message) {
  //   $message.success(config.data.message);
  // }

  return config?.data;
};

publicAxiosInstance.interceptors.response.use(responseInterceptor);
privateAxiosInstance.interceptors.response.use(responseInterceptor);

// Hàm tạo yêu cầu cho public request
export const publicRequest = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return publicAxiosInstance.request({
    method,
    url,
    data,
    ...config,
  });
};

// Hàm tạo yêu cầu cho private request
export const privateRequest = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return privateAxiosInstance.request({
    method,
    url,
    data,
    ...config,
  });
};
