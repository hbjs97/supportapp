export default function useToken() {
  const getAccessToken = () => {
    return localStorage.getItem("@accessToken") || null;
  };

  const setAccessToken = (accessToken) => {
    localStorage.setItem("@accessToken", accessToken);
  };

  const getRefreshToken = () => {
    return localStorage.getItem("@refreshToken") || null;
  };

  const setRefreshToken = (refreshToken) => {
    localStorage.setItem("@refreshToken", refreshToken);
  };

  return { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken };
}
