const pool = require("../database/db");
const { StatusCodes } = require("http-status-codes");

class Flashcard {
  static async createDeck(user_id, name) {
    const query = "INSERT INTO deck (user_id, deck_name) VALUES ($1, $2);";
    const response = await pool.query(query, [user_id, name]);
    return response;
  }

  static async deckGetAll(userId) {
    const query = "SELECT * FROM deck where user_id = $1";
    const response = await pool.query(query, [userId]);
    return response.rows;
  }

  static async checkDeck(deckId) {
    const check = await pool.query("SELECT * FROM deck WHERE id = $1", [
      deckId,
    ]);
    return check;
  }

  static async createWord(deckId, wordObj, time) {
    const query =
      "INSERT INTO word (deck_id, word, meaning, description, time_create) VALUES ($1, $2, $3, $4, $5);";
    const response = await pool.query(query, [
      deckId,
      wordObj.word_,
      wordObj.meaning,
      wordObj.description,
      time,
    ]);
    return response;
  }

  static async wordGetAll(deckId) {
    const query = "SELECT * FROM word where deck_id = $1";
    const response = await pool.query(query, [deckId]);
    return response.rows;
  }

  static async getFrontDeck(deckId) {
    const query =
      "SELECT * FROM word WHERE time_create = (SELECT MIN(time_create) FROM word) AND deck_id = $1;";
    const response = await pool.query(query, [deckId]);
    return response.rows;
  }

  static async updateWord(request, time) {
    const wordId = request.wordId;
    const level = request.level;
    let time_create;
    if (level == 1) {
      time_create = time + 1 * 60;
    } else if (level == 2) {
      time_create = time + 6 * 60;
    } else if (level == 3) {
      time_create = time + 10 * 60;
    } else {
      time_create = time + 1400 * 60;
    }

    const query = " UPDATE word SET time_create = $1 WHERE id = $2;";
    const response = await pool.query(query, [time_create, wordId]);
    return response;
  }
}

module.exports = Flashcard;
