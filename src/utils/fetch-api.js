import axios from "axios";
import Router from "next/router";
import qs from "query-string";

export const HOST_URL =
  process.env.NODE_ENV === "production"
    ? "https://supportapp01-backend.herokuapp.com"
    : "http://localhost:5000";
axios.defaults.baseURL = `${HOST_URL}/api/v1`;

axios.interceptors.request.use((req) => req);

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
      localStorage.clear();
      Router.push("/login");
    }
  }
);

export const apiRoute = {
  health: "/health",
  auth: {
    register: "/register",
    login: "/login",
    refresh: "/refresh",
    unregister: "/",
  },
  user: {
    subscribers: "/users/subscribers",
    duplication: "/users/duplication",
  },
  bookmark: "/bookmarks",
  mall: {
    getMalls: "/malls",
    getMyMalls: "malls/my",
    getBookmarkedMalls: "/malls/bookmarks",
    enrollMall: "/malls",
    updateMall: "/malls",
  },
};

export async function RequestKakaoAddressApi(query, page) {
  return axios
    .get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?${qs.stringify({
        query,
        page,
        size: 10,
      })}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
        },
      }
    )
    .then((res) => {
      return {
        data: res?.data?.documents,
        config: {
          status: res.status,
          ...res?.data?.meta,
        },
      };
    })
    .catch((error) => {
      return {
        data: error.response?.data,
        config: {
          status: -1,
        },
      };
    });
}

export async function RequestGet(url, header, token) {
  const headerTemplate = { "Content-Type": "application/json" };
  if (header) Object.assign(headerTemplate, { ...header });
  if (token) Object.assign(headerTemplate, { authorization: `Bearer ${token}` });

  return axios
    .get(url, {
      headers: headerTemplate,
    })
    .then((res) => ({
      data: res?.data,
      config: {
        status: res?.status,
        ...res?.data?.meta,
      },
    }))
    .catch((error) => {
      return {
        data: error.response?.data,
        config: {
          status: -1,
        },
      };
    });
}

export async function RequestPost(url, body, header, token) {
  const headerTemplate = { "Content-Type": "application/json" };
  if (token) Object.assign(headerTemplate, { authorization: `Bearer ${token}` });

  return axios
    .post(url, body, {
      headers: headerTemplate,
    })
    .then((res) => ({
      data: res?.data,
      config: {
        status: res?.status,
        ...res?.data?.meta,
      },
    }))
    .catch((error) => {
      return {
        data: error.response?.data,
        config: {
          status: -1,
        },
      };
    });
}

export async function RequestMultiPartPost(url, body, token) {
  const headerTemplate = { "Content-Type": "multipart/form-data" };
  if (token) Object.assign(headerTemplate, { authorization: `Bearer ${token}` });

  return axios
    .post(url, body, {
      headers: headerTemplate,
    })
    .then((res) => ({
      data: res?.data,
      config: {
        status: res?.status,
        ...res?.data?.meta,
      },
    }))
    .catch((error) => {
      return {
        data: error.response?.data,
        config: {
          status: -1,
        },
      };
    });
}

export async function RequestDelete(url, token) {
  const headerTemplate = { "Content-Type": "application/json" };
  if (token) Object.assign(headerTemplate, { authorization: `Bearer ${token}` });

  return axios
    .delete(url, {
      headers: headerTemplate,
    })
    .then((res) => ({
      data: res?.data,
      config: {
        status: res?.status,
        ...res?.data?.meta,
      },
    }))
    .catch((error) => {
      return {
        data: error.response?.data,
        config: {
          status: -1,
        },
      };
    });
}
