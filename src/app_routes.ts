const ROUTES = {
  AUTH: {
    BASE: "/auth",
    ROUTES: {
      REGISTER: "/register",
      ACTIVATE: "/activate",
      LOGIN: "/login",
      LOGOUT: "/logout",
      REFRESH: "/refresh",
      UPLOAD_AVATAR: "/upload-avatar",
    },
  },
  POSTS: {
    BASE: "/posts",
    ROUTES: {
      CREATE: "/create",
      LIST: "/list",
      USER_LIST: "/:id/list",
      DELETE: "/:id/delete",
      EDIT: "/:id/edit",
    },
  },
  UPLOADS: {
    USER_PHOTO: "/user-photo",
  },
};

export default ROUTES;
