const { StatusCodes } = require("http-status-codes");
const errorSchema = require("./common/errorSchema");
const notFoundSchema = require("./common/notFoundSchema");

const userCreateSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
};

const signInSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
};

const tokenSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
  required: ["token"],
};

const editNameSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
  },
  required: ["token", "firstName", "lastName"],
};

const editEmailSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
    email: { type: "string" },
  },
  required: ["token", "email"],
};

const editPassSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
    password: { type: "string" },
    newPassword: { type: "string" },
  },
  required: ["token", "password", "newPassword"],
};

module.exports = {
  createOne: {
    description: "Create User",
    tags: ["User"],
    summary: "Create User Account",
    body: userCreateSchema,
    response: {
      [StatusCodes.BAD_REQUEST]: notFoundSchema,
      [StatusCodes.INTERNAL_SERVER_ERROR]: errorSchema,
    },
  },
  signIn: {
    description: "Sign in",
    tags: ["User"],
    summary: "Sign in Account",
    body: signInSchema,
    response: {
      [StatusCodes.BAD_REQUEST]: notFoundSchema,
      [StatusCodes.INTERNAL_SERVER_ERROR]: errorSchema,
    },
  },
  token: {
    description: "Information",
    tags: ["User"],
    summary: "Information of a user Account",
    body: tokenSchema,
    response: {
      [StatusCodes.BAD_REQUEST]: notFoundSchema,
      [StatusCodes.INTERNAL_SERVER_ERROR]: errorSchema,
    },
  },
  editName: {
    description: "Edit Name",
    tags: ["Edit info"],
    summary: "Edit first name and last name",
    body: editNameSchema,
    response: {
      [StatusCodes.BAD_REQUEST]: notFoundSchema,
      [StatusCodes.INTERNAL_SERVER_ERROR]: errorSchema,
    },
  },
  editEmail: {
    description: "Edit email",
    tags: ["Edit info"],
    summary: "Edit user email",
    body: editEmailSchema,
    response: {
      [StatusCodes.BAD_REQUEST]: notFoundSchema,
      [StatusCodes.INTERNAL_SERVER_ERROR]: errorSchema,
    },
  },
  editPass: {
    description: "Edit pass",
    tags: ["Edit info"],
    summary: "Edit user password",
    body: editPassSchema,
    response: {
      [StatusCodes.BAD_REQUEST]: notFoundSchema,
      [StatusCodes.INTERNAL_SERVER_ERROR]: errorSchema,
    },
  },
};
