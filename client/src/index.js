import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : "https://localhost:8709";

console.log("axios.defaults.baseURL >> ", axios.defaults.baseURL);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
