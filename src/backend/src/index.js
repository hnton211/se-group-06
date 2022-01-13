const { userRoute } = require("./routes/userRoute");
const fastify = require("fastify")({ logger: true });
const migrate = require("./database/migrate");
const { flashcardRoute } = require("./routes/flashcardRoute");
cors = require("cors");
module.export = fastify;

(async function () {
  try {
    //Migrate data
    await migrate();
    await fastify.register(require("fastify-express"));
    fastify.use(cors());
    //Register route
    fastify.register(userRoute);
    fastify.register(flashcardRoute);

    //Listen port
    await fastify.listen(3001, "0.0.0.0");
  } catch (error) {
    console.log(error);
  }
})();
