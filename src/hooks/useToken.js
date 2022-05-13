export default function useToken() {
  const getAccessToken = () => {
    return sessionStorage.getItem("@accessToken") || null;
  };

  const setAccessToken = (accessToken) => {
    sessionStorage.setItem("@accessToken", accessToken);
  };

  const getRefreshToken = () => {
    return sessionStorage.getItem("@refreshToken") || null;
  };

  const setRefreshToken = (refreshToken) => {
    sessionStorage.setItem("@refreshToken", refreshToken);
  };

  return { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken };
}
