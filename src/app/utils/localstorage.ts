export const setLocalStorage = (key: string, value: string) => {
    // Kiểm tra xem trình duyệt có hỗ trợ Session Storage không
    if (typeof window !== "undefined" && window.localStorage) {
      // Lưu access token vào Session Storage
      window.localStorage.setItem(key, value);
    } else {
      console.error("Trình duyệt không hỗ trợ Session Storage.");
    }
  };
export const getLocalStorage = (key: string): string | null => {
    // Kiểm tra xem trình duyệt có hỗ trợ Local Storage không
    if (typeof window !== "undefined" && window.localStorage) {
      // Lấy giá trị từ Local Storage
      return window.localStorage.getItem(key);
    } else {
      console.error("Trình duyệt không hỗ trợ Local Storage.");
      return null;
    }
};
  