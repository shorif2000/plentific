import { REQUEST_PRO } from "../actions/pro";
import { FETCH_PRO } from "../actions/pro";
import { FETCH_PRO_COUNT } from "../actions/pro";

export default function(
  state = { isFetching: false, count: 0, items: [], page: 1 },
  action
) {
  switch (action.type) {
    case REQUEST_PRO:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_PRO_COUNT:
      const {
        headers,
        data: { code }
      } = action.payload;
      if (code === 0) {
        return Object.assign({}, state, {
          //isFetching: false,
          count: parseInt(headers["x-pagination-count"])
        });
      }
      return Object.assign({}, state, { isFetching: false, count: 0 });

    case FETCH_PRO:
      if (action.payload.data.code === 0) {
        const { headers } = action.payload;
        const limit = parseInt(headers["x-pagination-limit"]);
        const offset = parseInt(headers["x-pagination-offset"]);
        let page;
        if (offset === 0) {
          page = 1;
        } else {
          page = offset / limit + 1;
        }
        return Object.assign({}, state, {
          isFetching: false,
          items: action.payload.data.response.pros,
          page: page
        });
        //return action.payload.data.response.pros;
      }
      return Object.assign({}, state, {
        isFetching: false,
        count: 0,
        items: [],
        page: 1
      });
    default:
      return state;
  }
}
