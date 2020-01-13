import typy from "typy";
import { call, put, takeLatest } from "redux-saga/effects";
import Config from "../config";
import Network from "../network";

function* sagaFetchUserProfile({ payload }) {
  try {
    console.log("fUP", payload);

    yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_PROFILE, payload: { flag: true } });
    const response = yield call([Network, Network.fetchUserProfile], { ...payload.user });

    const { status } = response;
    const result = yield response.json();

    switch (status) {
      case Config.HTTP_STATUS.OK: {
        const profile = {
          score: typy(result, "accuracy").isTruthy ? typy(result, "accuracy").safeNumber : 0,
          mazeCount: typy(result, "ownMazesCount").isTruthy ? typy(result, "ownMazesCount").safeNumber : 0,
          mazePlayers: typy(result, "ownMazesPlayersCount").isTruthy ? typy(result, "ownMazesCount").safeNumber : 0,
        };

        yield put({ type: Config.REDUX_ACTION.PROFILE_SET, payload: { ...profile } });
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
  yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_PROFILE, payload: { flag: false } });
}

function* sagaFetchMazes({ payload }) {
  try {
    console.log(payload);

    yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_MAZES, payload: { flag: true } });
    const response = yield call([Network, Network.fetchMazes], { ...payload.user });

    const { status } = response;
    const result = yield response.json();

    console.log(status, result);

    switch (status) {
      case Config.HTTP_STATUS.OK: {
        const list = result;
        const playground = [];
        const self = [];

        list.forEach((element) => {
          const mirror = {
            ...element,
            title: element.name,
            username: element.owner,
            players: element.playersCount,
          };
          if (typy(element, "ownerId").safeString.toLowerCase() === payload.user.id.toLowerCase()) self.push(mirror);
          else playground.push(mirror);
        });

        yield put({ type: Config.REDUX_ACTION.PROFILE_SET_MAZES_PLAYGROUND, payload: { list: playground } });
        yield put({ type: Config.REDUX_ACTION.PROFILE_SET_MAZES_SELF, payload: { list: self } });

        if (typy(payload, "onSuccess").isFunction) yield payload.onSuccess();
        break;
      }
      case Config.HTTP_STATUS.BAD_REQUEST: {
        if (typy(payload, "onError").isFunction) yield payload.onError();
        break;
      }
      case Config.HTTP_STATUS.UNAUHTORIZED: {
        // Network.EMERGENCY();
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.warn(e);
  }
  yield put({ type: Config.REDUX_ACTION.FLAG_SET_LOADING_MAZES, payload: { flag: false } });
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
  takeLatest(Config.SAGA_ACTION.USER_FETCH_MAZES, sagaFetchMazes),
  takeLatest(Config.SAGA_ACTION.USER_FETCH_MAZES_SELF, sagaFetchMazesSelf),
  takeLatest(Config.SAGA_ACTION.USER_FETCH_MAZES_PLAYGROUND, sagaFetchMazesPlayground),
];
