import { FETCH_PRO_COUNT } from "../actions/pro";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PRO_COUNT:
      if (action.payload.data.code === 0) {
        return Object.keys(action.payload.data.response.pros).length;
      }
      return 0;
    default:
      return state;
  }
}
