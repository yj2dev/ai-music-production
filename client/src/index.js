import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
console.log(
  "process.env.REACT_APP_BASE_URL >> ",
  process.env.REACT_APP_BASE_URL
);
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
