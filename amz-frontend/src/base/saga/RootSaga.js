/* eslint-disable import/no-cycle */
import { all } from "redux-saga/effects";
import { DataSaga } from "./DataSaga";

export default function* RootSaga() {
  yield all([...DataSaga]);
}
