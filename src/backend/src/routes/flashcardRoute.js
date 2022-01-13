const {
  deckCreate,
  deckViewAll,
  wordAdd,
  wordViewAll,
  getFrontDeck,
  updateTime,
} = require("../controllers/flashcardController");

const flashcardRoute = (fastify, otps, next) => {
  const routes = [
    {
      method: "POST",
      url: "/flashcard/deck/create",
      handler: deckCreate,
    },
    {
      method: "POST",
      url: "/flashcard/deck/all",
      handler: deckViewAll,
    },
    {
      method: "POST",
      url: "/flashcard/deck/word/front",
      handler: getFrontDeck,
    },
    {
      method: "POST",
      url: "/flashcard/deck/word/add",
      handler: wordAdd,
    },
    {
      method: "POST",
      url: "/flashcard/deck/word/update",
      handler: updateTime,
    },
    {
      method: "POST",
      url: "/flashcard/deck/word/all",
      handler: wordViewAll,
    },
  ];

  routes.forEach((item) => {
    fastify.route(item);
  });
  next();
};

module.exports = { flashcardRoute };
