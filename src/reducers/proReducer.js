import { FETCH_PRO } from "../actions/pro";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PRO:
      if (action.payload.data.code === 0) {
        return action.payload.data.response.pros;
      }
      return [];
    default:
      return state;
  }
}
