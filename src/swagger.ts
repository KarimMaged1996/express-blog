import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Express Blog",
    version: "1.0.0",
    description: "API Documentation",
  },
  paths: {},
};

const initializeDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default initializeDocs;
