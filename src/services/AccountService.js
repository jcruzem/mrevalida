import http from "./http";

export function fetchAccounts() {
  return http.get("/account/all");
}
