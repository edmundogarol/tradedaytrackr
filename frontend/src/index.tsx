import NavigationContainer from "@navigation/NavigationContainer";
import store from "@redux/store";
import environmentConfig from "@utils/environmentConfig";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./styles/plugins.css";

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container as HTMLElement);

if (!container) {
  throw new Error("React mount point #app not found");
}

console.log(environmentConfig.HOST);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
