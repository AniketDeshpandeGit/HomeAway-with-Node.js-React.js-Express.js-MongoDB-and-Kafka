import axios from "axios";

export const FETCH_LOGIN = "login";

const ROOT_URL = "http://18.225.5.238";

//target action

export function loginDetails(values, callback) {
  const request = axios;
  console
    .log("in function redux")
    .post(`${ROOT_URL}/ownerlogin`, values)
    .then(() => callback());
  console.log("Response in redux", values);
  return {
    type: FETCH_LOGIN,
    payload: request
  };
}
