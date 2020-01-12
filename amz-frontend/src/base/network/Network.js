import { PURGE } from "redux-persist";
import Config from "../config";
import { Store } from "../index";

class Network {
  static fetchUserProfile({ id }) {
    const API = new URL(Config.API.USER_PROFILE + id);

    return {
      status: 200,
      json: () => {
        return {
          score: "201",
          mazeCount: 4,
          mazePlayers: 10,
        };
      },
    };

    // return fetch(API, {
    //   headers: new Headers({
    //     "content-type": "application/json",
    //   }),
    //   method: "GET",
    //   contentType: "application/json",
    // });
  }

  static fetchMazesSelf({ id }) {
    const API = new URL(Config.API.MAZES_SELF);

    return {
      status: 200,
      json: () => {
        return {
          list: [
            {
              id: "1A",
              players: 1,
              title: "Awesome maze",
            },
            {
              id: "2B",
              players: 2201,
              title: "Incredible maze",
            },
            {
              id: "3C",
              players: 3,
              title: "Incredible maze  22222 sadsad sad sa",
            },
          ],
        };
      },
    };

    // return fetch(API, {
    //   headers: new Headers({
    //     "content-type": "application/json",
    //   }),
    //   method: "GET",
    //   contentType: "application/json",
    // });
  }

  static fetchMazesPlayground() {
    const API = new URL(Config.API.MAZES_PLAYGROUND);

    return {
      status: 200,
      json: () => {
        return {
          list: [
            {
              id: "I-I",
              username: "Razgraf",
              title: "Crazy path finder",
            },
            {
              id: "IIx",
              players: 2201,
              title: "My maze",
            },
          ],
        };
      },
    };

    // return fetch(API, {
    //   headers: new Headers({
    //     "content-type": "application/json",
    //   }),
    //   method: "GET",
    //   contentType: "application/json",
    // });
  }

  static doUserLogin(data) {
    const API = new URL(Config.API.LOGIN);

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
      }),
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(data),
    });
  }

  static doUserRegister(data) {
    const API = new URL(Config.API.REGISTER);

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
      }),
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(data),
    });
  }

  static EMERGENCY = async () => {
    Store.dispatch({ type: PURGE, result: () => null });
    window.location.href = Config.ROUTE_PAGE_CONNECT;
  };
}

export default Network;
