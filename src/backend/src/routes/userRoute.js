const {
  userCreate,
  userView,
  signIn,
  getInfo,
  editUsername,
  editUserEmail,
  editUserPassword,
} = require("../controllers/userController");
const userSchema = require("./schema/userSchema");

const userRoute = (fastify, otps, next) => {
  const routes = [
    {
      method: "POST",
      url: "/user/create",
      schema: userSchema.createOne,
      handler: userCreate,
    },
    {
      method: "POST",
      url: "/signin",
      schema: userSchema.signIn,
      handler: signIn,
    },
    {
      method: "POST",
      url: "/user/info",
      schema: userSchema.token,
      handler: getInfo,
    },
    {
      method: "PUT",
      url: "/user/update/name",
      schema: userSchema.editName,
      handler: editUsername,
    },
    {
      method: "PUT",
      url: "/user/update/email",
      schema: userSchema.editEmail,
      handler: editUserEmail,
    },
    {
      method: "PUT",
      url: "/user/update/password",
      schema: userSchema.editPass,
      handler: editUserPassword,
    },
    {
      method: "GET",
      url: "/user",
      handler: userView,
    },
  ];

  routes.forEach((item) => {
    fastify.route(item);
  });
  next();
};

module.exports = { userRoute };
