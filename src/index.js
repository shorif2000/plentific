import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reducers from "./reducers";
import promise from "redux-promise";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import App from "./App";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(promise))
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
