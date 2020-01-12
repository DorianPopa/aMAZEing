import typy from "typy";
import { call, put, takeLatest } from "redux-saga/effects";
import Config from "../config";
import Network from "../network";

function* sagaFetchUserProfile({ payload }) {
  try {
    yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_PROFILE, payload: { flag: true } });
    const response = yield call([Network, Network.fetchUserProfile], { id: payload.id });
    yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_PROFILE, payload: { flag: false } });

    const { status } = response;
    const result = yield response.json();

    switch (status) {
      case Config.HTTP_STATUS.OK: {
        yield put({ type: Config.REDUX_ACTION.PROFILE_SET, payload: { ...result } });
        if (typy(payload, "onSuccess").isFunction) yield payload.onSuccess();
        break;
      }
      case Config.HTTP_STATUS.BAD_REQUEST: {
        if (typy(payload, "onError").isFunction) yield payload.onError();
        break;
      }
      case Config.HTTP_STATUS.UNAUHTORIZED: {
        Network.EMERGENCY();
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.warn(e);
  }
}

function* sagaFetchMazesSelf({ payload }) {
  try {
    if (typy(payload, "reset").isTruthy)
      yield put({ type: Config.REDUX_ACTION.PROFILE_SET_MAZES_SELF, payload: { list: [] } });

    yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_MAZES_SELF, payload: { flag: true } });
    const response = yield call([Network, Network.fetchMazesSelf], { id: payload.id });
    yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_MAZES_SELF, payload: { flag: false } });

    const { status } = response;
    const result = yield response.json();

    switch (status) {
      case Config.HTTP_STATUS.OK: {
        yield put({ type: Config.REDUX_ACTION.PROFILE_SET_MAZES_SELF, payload: { list: result.list } });
        if (typy(payload, "onSuccess").isFunction) yield payload.onSuccess();
        break;
      }
      case Config.HTTP_STATUS.BAD_REQUEST: {
        if (typy(payload, "onError").isFunction) yield payload.onError();
        break;
      }
      case Config.HTTP_STATUS.UNAUHTORIZED: {
        Network.EMERGENCY();
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.warn(e);
  }
}

function* sagaFetchMazesPlayground({ payload }) {
  try {
    if (typy(payload, "reset").isTruthy)
      yield put({ type: Config.REDUX_ACTION.PROFILE_SET_MAZES_PLAYGROUND, payload: { list: [] } });

    yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_MAZES_PLAYGROUND, payload: { flag: true } });
    const response = yield call([Network, Network.fetchMazesPlayground], { id: payload.id });
    yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_MAZES_PLAYGROUND, payload: { flag: false } });

    const { status } = response;
    const result = yield response.json();

    switch (status) {
      case Config.HTTP_STATUS.OK: {
        yield put({ type: Config.REDUX_ACTION.PROFILE_SET_MAZES_PLAYGROUND, payload: { list: result.list } });
        if (typy(payload, "onSuccess").isFunction) yield payload.onSuccess();
        break;
      }
      case Config.HTTP_STATUS.BAD_REQUEST: {
        if (typy(payload, "onError").isFunction) yield payload.onError();
        break;
      }
      case Config.HTTP_STATUS.UNAUHTORIZED: {
        Network.EMERGENCY();
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.warn(e);
  }
}

export const DataSaga = [
  takeLatest(Config.SAGA_ACTION.USER_FETCH_PROFILE, sagaFetchUserProfile),
  takeLatest(Config.SAGA_ACTION.USER_FETCH_MAZES_SELF, sagaFetchMazesSelf),
  takeLatest(Config.SAGA_ACTION.USER_FETCH_MAZES_PLAYGROUND, sagaFetchMazesPlayground),
];
