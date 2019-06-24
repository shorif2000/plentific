import axios from "axios";
var CancelToken = axios.CancelToken;
let pro_count_cancel, pro_cancel;

export const REQUEST_PRO = "request_pro";

export async function requestPro() {
  return {
    type: REQUEST_PRO,
    payload: {}
  };
}

export const FETCH_PRO = "fetch_pro";

export async function fetchPro(category_id, location, offset) {
  pro_cancel && pro_cancel() && pro_count_cancel();
  const params = { category_id: category_id };
  if (location !== null && location !== "") {
    params.location = location;
  }
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
        pro_cancel = c;
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
  pro_count_cancel && pro_count_cancel();
  const params = { category_id: category_id };
  if (location !== null && location !== "") {
    params.location = location;
  }
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
        pro_count_cancel = c;
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
