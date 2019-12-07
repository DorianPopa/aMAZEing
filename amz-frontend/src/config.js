class Config {
  static currentUserID = "abc1";

  static dummy = {
    abc1: {
      userID: "abc1",
      mazes: [
        {
          mazeID: 1,
          number: 1,
          title: "Amazing maze",
          playerCount: 2,
        },
        {
          mazeID: 3,
          number: 2,
          title: "Bad maze",
          playerCount: 0,
        },
        {
          mazeID: 20,
          number: 3,
          title: "cola",
          playerCount: 20,
        },
      ],
    },
    abc2: {},
  };
}

export default Config;
