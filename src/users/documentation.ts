export const UsersDocs = {
  register: {
    post: {
      summary: "Create a new user",
      tags: ["users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "john@example.com" },
                username: { type: "string", example: "johnDoe" },
                password: { type: "string", example: "myPass1234" },
              },
              required: ["email", "username", "password"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                type: "string",
                example: "User created successfully",
              },
            },
          },
        },
        "400": {
          description: "user already exists",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "This user already exists",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
