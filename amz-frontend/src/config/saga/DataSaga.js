import { takeLatest } from "redux-saga/effects"; // call, put,
import Config from "../Config";

function* sagaTest({ payload }) {
  try {
    yield console.log(payload);
    let i = yield 2;
    i -= -1;
    console.log(i);

    // const request = yield call([Context, Context.function]);
    // const response = yield request.json();
  } catch (e) {
    console.warn(e);
  }
}

export const DataSaga = [takeLatest(Config.REDUX_ACTION_TEST, sagaTest)];
