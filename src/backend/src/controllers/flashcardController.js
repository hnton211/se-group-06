const User = require("../models/userModel");
const Flashcard = require("../models/flashcardModel");
const { StatusCodes } = require("http-status-codes");

const deckCreate = async (req, res) => {
  try {
    const token = req.body.token;
    const checkUserResponse = await User.decodeToken(token, res);

    if (checkUserResponse.rowCount === 0) {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "User not found!" });
    }
    const userId = checkUserResponse.rows[0].id;

    const document = await Flashcard.createDeck(userId, req.body.name);
    res.code(StatusCodes.OK).send(document);
  } catch (e) {
    console.log(e);
  }
};

const deckViewAll = async (req, res) => {
  try {
    const token = req.body.token;
    const checkUserResponse = await User.decodeToken(token, res);

    if (checkUserResponse.rowCount === 0) {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "User not found!" });
    }
    const userId = checkUserResponse.rows[0].id;

    const document = await Flashcard.deckGetAll(userId);

    res.code(StatusCodes.OK).send(document);
  } catch (e) {
    console.log(e);
  }
};

const wordViewAll = async (req, res) => {
  console.log(req.body);
  const document = await Flashcard.wordGetAll(req.body.deckId);

  if (document.rowCount === 0) {
    return res
      .code(StatusCodes.BAD_REQUEST)
      .send({ message: "User not found!" });
  }

  res.code(StatusCodes.OK).send(document);
};

const wordAdd = async (req, res) => {
  const checkDeckResponse = await Flashcard.checkDeck(req.body.deckId);
  if (checkDeckResponse.rowCount === 0) {
    return res
      .code(StatusCodes.BAD_REQUEST)
      .send({ message: "Deck is not existed" });
  }

  const time = (Date.now() - (Date.now() % 1000)) / 1000;

  const wordObj = {
    word_: req.body.word,
    meaning: req.body.meaning,
    description: req.body.description,
  };
  const document = await Flashcard.createWord(req.body.deckId, wordObj, time);
  res.code(StatusCodes.OK).send(document);
};

const getFrontDeck = async (req, res) => {
  const checkDeckResponse = await Flashcard.checkDeck(req.body.deckId);
  if (checkDeckResponse.rowCount === 0) {
    return res
      .code(StatusCodes.BAD_REQUEST)
      .send({ message: "Deck is not existed" });
  }

  const document = await Flashcard.getFrontDeck(req.body.deckId);
  res.code(StatusCodes.OK).send(document);
};

const updateTime = async (req, res) =>{
  const checkDeckResponse = await Flashcard.checkDeck(req.body.deckId);
  if (checkDeckResponse.rowCount === 0) {
    return res
      .code(StatusCodes.BAD_REQUEST)
      .send({ message: "Deck is not existed" });
  }

  const time = (Date.now() - (Date.now() % 1000)) / 1000;

  const document = await Flashcard.updateWord(req.body, time)
  res.code(StatusCodes.OK).send(document);
}

module.exports = {
  deckCreate,
  deckViewAll,
  wordViewAll,
  wordAdd,
  getFrontDeck,
  updateTime
};
