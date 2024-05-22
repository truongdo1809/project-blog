interface AuthData {
  user: {
    user: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export function convertAuthDataFromLocalStorage(): {
  accessToken: string;
  refreshToken: string;
} | null {
  const persistRootJSON = localStorage.getItem("persist:root");

  if (persistRootJSON) {
    const persistRoot = JSON.parse(persistRootJSON);

    if (persistRoot && persistRoot.auth) {
      const authData: AuthData = JSON.parse(persistRoot.auth)
      if (authData && authData.user && authData.user.user) {
        const { accessToken, refreshToken } = authData.user.user;
        return { accessToken, refreshToken };
      }
    }
  }
  return null;
}
