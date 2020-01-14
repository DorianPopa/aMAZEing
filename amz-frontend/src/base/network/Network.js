import { PURGE } from "redux-persist";
import Config from "../config";
import { Store } from "../index";

class Network {
  static fetchLeaderboards(user) {
    const API = new URL(Config.API.LEADERBOARDS());

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
        Bearer: user.token,
      }),
      method: "GET",
      contentType: "application/json",
    });
  }

  static fetchUserProfile(user) {
    const API = new URL(Config.API.USER_PROFILE(user.id));

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
        Bearer: user.token,
      }),
      method: "GET",
      contentType: "application/json",
    });
  }

  static fetchMaze(user, mazeId) {
    const API = new URL(Config.API.MAZE_PROFILE(mazeId));

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
        Bearer: user.token,
      }),
      method: "GET",
      contentType: "application/json",
    });
  }

  static fetchMazePlainSolution(user, mazeId) {
    const API = new URL(Config.API.MAZE_PLAIN_SOLUTION(mazeId));

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
        Bearer: user.token,
      }),
      method: "GET",
      contentType: "application/json",
    });
  }

  static fetchMazeSolution(user, maze, type) {
    let API = null;
    switch (type) {
      case Config.SOLUTION_ALGORIGHM.BFS:
        API = new URL(Config.API.MAZE_SOLVE_BFS(user.id));
        break;
      case Config.SOLUTION_ALGORIGHM.BIDIRECTIONAL_BFS:
        API = new URL(Config.API.MAZE_SOLVE_BIDIRECTIONAL_BFS(user.id));
        break;
      case Config.SOLUTION_ALGORIGHM.ASTAR:
        API = new URL(Config.API.MAZE_SOLVE_ASTAR(user.id));
        break;
      default:
        break;
    }

    if (!API) {
      console.warn("Unknown soluton type.");
      return null;
    }

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
        Bearer: user.token,
      }),
      method: "POST",
      contentType: "application/json",
    });
  }

  static fetchMazes(user) {
    const API = new URL(Config.API.MAZES());

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
        Bearer: user.token,
        // Authorization: `Bearer ${user.token}`,
      }),
      method: "GET",
      contentType: "application/json",
    });
  }

  static doSolutionSubmit(user, data, mazeId) {
    const API = new URL(Config.API.MAZE_SUBMIT_SOLUTION(mazeId));

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
        Bearer: user.token,
        Authorization: `Bearer ${user.token}`,
      }),
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(data),
    });
  }

  static doMazeCreate(user, data) {
    const API = new URL(Config.API.MAZE_CREATE(user.id));

    return fetch(API, {
      headers: new Headers({
        "content-type": "application/json",
        Bearer: user.token,
        Authorization: `Bearer ${user.token}`,
      }),
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(data),
    });
  }

  static doUserLogin(data) {
    const API = new URL(Config.API.LOGIN());

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
    const API = new URL(Config.API.REGISTER());

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

  /**
   *
   * <<<< DEPRECATED >>>>
   *
   */

  static fetchMazesSelf({ id }) {
    // const API = new URL(Config.API.MAZES_SELF(id));
    console.log(id);
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
    // const API = new URL(Config.API.MAZES_PLAYGROUND());

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
}

export default Network;
