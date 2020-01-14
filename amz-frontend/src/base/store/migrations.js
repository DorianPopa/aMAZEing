const migrations = {
  0: (store) => {
    return {
      ...store,
    };
  },
  1: (store) => {
    return {
      ...store,
      auth: {
        token: store.auth.token,
      },
    };
  },
  2: (store) => {
    return {
      ...store,
      auth: {
        ...store.auth,
        id: store.auth.id,
      },
    };
  },
  3: (store) => {
    return {
      ...store,
      auth: {
        ...store.auth,
        username: store.auth.username,
      },
    };
  },
};
export default migrations;
