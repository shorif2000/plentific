import axios from "axios";
var CancelToken = axios.CancelToken;
let fetch_cancel;

export const FETCH_CATEGORIES = "fetch_categories";

export async function fetchCategories() {
  fetch_cancel && fetch_cancel();
  const request = await axios.get(
    `https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json`,
    {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        fetch_cancel = c;
      })
    }
  );
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}
