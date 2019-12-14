import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import RootSaga from "../saga/RootSaga";
import RootReducer from "./reducer/RootReducer";

const SagaMiddleware = createSagaMiddleware();

const PersistedReducer = persistReducer(
  {
    key: "root",
    version: 0,
    storage: localStorage,
    stateReconciler: autoMergeLevel2,
    whitelist: ["auth"],
    blacklist: ["data", "request"],
  },
  RootReducer,
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(PersistedReducer, composeEnhancers(applyMiddleware(SagaMiddleware))); // createLogger()
const Persistor = persistStore(Store);

export { Store, Persistor };

SagaMiddleware.run(RootSaga);
