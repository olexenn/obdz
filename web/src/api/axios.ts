import axios from "axios";

const API_URL = "http://localhost:3001";

const $http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

$http.interceptors.request.use((config) => {
  const token = localStorage.getItem("csrf");
  config.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  return config;
});

//$http.interceptors.response.use(undefined, (error) => {
//if (
//error.response &&
//error.response.config &&
//error.response.status === 401
//) {
//// In case 401 is caused by expired access cookie - we'll do refresh request
//return $http
//.post("/refresh", {}, { headers: { "X-CSRF-TOKEN": localStorage.csrf } })
//.then((response) => {
//localStorage.csrf = response.data.csrf;
//localStorage.signedIn = true;
//// And after successful refresh - repeat the original request
//let retryConfig = error.response.config;
//retryConfig.headers["X-CSRF-TOKEN"] = localStorage.csrf;
//return $http.request(retryConfig);
//})
//.catch((error) => {
//delete localStorage.csrf;
//delete localStorage.signedIn;
//// redirect to signin in case refresh request fails
//return Promise.reject(error);
//});
//} else {
//return Promise.reject(error);
//}
//});

export default $http;
