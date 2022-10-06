import http from "./http";
import jwtDecode from "jwt-decode";
import * as qs from "qs";

export function register(username, password) {
  return http.post("/users", { username, password });
}

export function login(username, password) {
  const data = { username: username, password: password };
  return http.post("/login", qs.stringify(data));
}

export function getCurrentUser() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null;
  }

  const decoded = jwtDecode(accessToken);
  return decoded.sub;
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
