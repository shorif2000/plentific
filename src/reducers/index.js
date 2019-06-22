import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import CategoriesReducer from "./categoriesReducer";
import ProReducer from "./proReducer";
import ProCountReducer from "./proCountReducer";

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  categoriesReducer: CategoriesReducer,
  proReducer: ProReducer,
  proCountReducer: ProCountReducer
});
