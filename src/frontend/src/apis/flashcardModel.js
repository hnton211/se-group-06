const axios = require("axios");
const baseUrl = "http://localhost:3001";

const getAllDeck = async (token) => {
  try {
    const { data } = await axios.post(`${baseUrl}/flashcard/deck/all`, {
      token,
    });
    return { success: true, data };
  } catch (error) {
    if (error?.response?.data) {
      return { success: false, message: error.response.data.message };
    }
  }
};

const createDeck = async (token, name) => {
  try {
    const { data } = await axios.post(`${baseUrl}/flashcard/deck/create`, {
      token,
      name,
    });
    return { success: true, data };
  } catch (error) {
    if (error?.response?.data) {
      return { success: false, message: error.response.data.message };
    }
  }
};

const createWord = async (deckId, word, meaning, description) => {
  try {
    const { data } = await axios.post(`${baseUrl}/flashcard/deck/word/add`, {
      deckId,
      word,
      meaning,
      description,
    });
    return { success: true, data };
  } catch (error) {
    if (error?.response?.data) {
      return { success: false, message: error.response.data.message };
    }
  }
};

const getWordsFromDeck = async (deckId) => {
  try {
    const { data } = await axios.post(`${baseUrl}/flashcard/deck/word/all`, {
      deckId,
    });
    return { success: true, data };
  } catch (error) {
    if (error?.response?.data) {
      return { success: false, message: error.response.data.message };
    }
  }
};

const pushToDeck = async (deckId, wordId, level) => {
  try {
    const { data } = await axios.post(`${baseUrl}/flashcard/deck/word/update`, {
      deckId,
      wordId,
      level,
    });
    return { success: true, data };
  } catch (error) {
    if (error?.response?.data) {
      return { success: false, message: error.response.data.message };
    }
  }
};

module.exports = {
  getAllDeck,
  createDeck,
  createWord,
  getWordsFromDeck,
  pushToDeck,
};
