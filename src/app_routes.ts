const ROUTES = {
  AUTH: {
    BASE: "/auth",
    ROUTES: {
      REGISTER: "/register",
      ACTIVATE: "/activate",
      LOGIN: "/login",
      LOGOUT: "/logout",
      REFRESH: "/refresh",
    },
  },
  POSTS: {
    BASE: "/posts",
    ROUTES: {
      CREATE: "/create",
    },
  },
};

export default ROUTES;
