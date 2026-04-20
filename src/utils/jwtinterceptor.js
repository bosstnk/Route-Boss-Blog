import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(window.localStorage.getItem("token"));

    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      }
    }

    return req;
  })

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(
        "❌ API Error:",
        error.response?.data || error.message
      );

      if (error.response.status === 401) {
        const isAuthPage = window.location.pathname === "/login";

        if (!isAuthPage) {
          window.localStorage.removeItem("token");
          window.location.replace("/login");
        }
      }

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;