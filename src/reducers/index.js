import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import CategoriesReducer from "./categoriesReducer";
import ProReducer from "./proReducer";

export default combineReducers({
  router: routerReducer,
  categoriesReducer: CategoriesReducer,
  proReducer: ProReducer
});
