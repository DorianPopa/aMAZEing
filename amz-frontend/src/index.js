import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import WebFont from "webfontloader";

import { Provider as AlertProvider } from "react-alert";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, Persistor } from "./base";

import Alert from "./components/Structure/Alert";
import App from "./components/App";

WebFont.load({
  google: {
    families: [
      "Ubutntu:300,400,500,700",
      "Roboto+Mono:300,400,500,700",
      // "Material+Icons",
      // "Material+Icons+Outlined",
      // "Material+Icons+Round",
    ],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <AlertProvider template={Alert} timeout={3000} position="bottom center" containerStyle={{ zIndex: 200000 }}>
          <App />
        </AlertProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
