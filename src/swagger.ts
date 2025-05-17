import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import ROUTES from "./app_routes";

// Import app docs
import { UsersDocs } from "./users/documentation";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Express Blog",
    version: "1.0.0",
    description: "API Documentation",
  },
  paths: {
    [`${ROUTES.AUTH.BASE}${ROUTES.AUTH.ROUTES.REGISTER}`]: UsersDocs.register,
  },
};

const initializeDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default initializeDocs;
