import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import WebFont from "webfontloader";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, Persistor } from "./config/store/Store";

import App from "./components/App";

WebFont.load({
  google: {
    families: [
      "Ubutntu:300,400,500,700",
      "Roboto+Mono:300,400,500,700",
      "Material+Icons",
      "Material+Icons+Outlined",
      "Material+Icons+Round",
    ],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
