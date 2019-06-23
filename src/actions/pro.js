import axios from "axios";
var CancelToken = axios.CancelToken;
let fetch_pro, fetch_pro_count;

export const REQUEST_PRO = "request_pro";

export async function requestPro() {
  return {
    type: REQUEST_PRO,
    payload: {}
  };
}

export const FETCH_PRO = "fetch_pro";

export async function fetchPro(category_id, location, offset) {
  fetch_pro && fetch_pro();
  const params = { category_id: category_id, location: location };
  //console.log(params);
  //const params = new URLSearchParams();
  //params.append("category_id", category_id);
  //params.append("location", location);
  const request = await axios.post(
    `https://demo.plentific.com/find-a-pro/api/v2/public/pro/search-pros/`,
    params,
    {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        fetch_pro = c;
      }),
      headers: {
        "Content-Type": "application/json",
        "x-pagination-offset": offset,
        "x-pagination-limit": 20
      }
    }
  );
  return {
    type: FETCH_PRO,
    payload: request
  };
}

export const FETCH_PRO_COUNT = "fetch_pro_count";

export async function fetchProCount(category_id, location, offset) {
  fetch_pro_count && fetch_pro_count();
  const params = { category_id: category_id, location: location };
  //console.log(params);
  //const params = new URLSearchParams();
  //params.append("category_id", category_id);
  //params.append("location", location);
  const request = await axios.post(
    `https://demo.plentific.com/find-a-pro/api/v2/public/pro/search-pros/`,
    params,
    {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        fetch_pro = c;
      }),
      headers: {
        "Content-Type": "application/json",
        "x-pagination-offset": offset
      }
    }
  );
  return {
    type: FETCH_PRO_COUNT,
    payload: request
  };
}
