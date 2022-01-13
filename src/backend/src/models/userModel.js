const pool = require("../database/db");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fsakjqwb1";

class User {
  static async createAccount(request) {
    const query =
      "INSERT INTO usertable (username, password, email, firstname, lastname) VALUES ($1, $2, $3, $4, $5);";
    const response = await pool.query(query, [
      request.username,
      request.password,
      request.email,
      request.firstname,
      request.lastname,
    ]);
    return response;
  }

  //To display the account in table usertable
  static async viewAccount() {
    const query = "SELECT * FROM usertable";
    const response = await pool.query(query);
    return response;
  }

  //Find account with username
  static async findAccount(username) {
    const query = "SELECT * FROM usertable where username = $1";
    const response = await pool.query(query, [username]);
    return response;
  }

  //Find account with id
  static async findAccountById(id) {
    const query = "SELECT * FROM usertable where id = $1";
    const response = await pool.query(query, [id]);
    return response;
  }

  //Compare input password with user's password
  static comparePassword(inputPassWord, userPassword) {
    return inputPassWord === userPassword;
  }

  //Validate token
  static async decodeToken(token, reply) {
    var userId;
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (decoded === undefined)
        return reply
          .code(StatusCodes.BAD_REQUEST)
          .send({ message: "Token is invalid !" });
      userId = decoded.userId;
    });

    const checkUserResponse = await this.findAccountById(userId);
    return checkUserResponse;
  }

  //Edit firstname, lastname of user
  static async editName(_userId, _newfirstname, _newlastname) {
    const query =
      "UPDATE usertable SET firstname = $2, lastname = $3 WHERE id = $1";
    const response = await pool.query(query, [
      _userId,
      _newfirstname,
      _newlastname,
    ]);
    return response;
  }

  //Edit email of user
  static async editEmail(_userId, _newemail) {
    const query = "UPDATE usertable SET email = $2 WHERE id = $1";
    const response = await pool.query(query, [_userId, _newemail]);
    return response;
  }

  //Edit password of user
  static async editPass(_userId, _newPass) {
    const query = "UPDATE usertable SET password = $2 WHERE id = $1";
    const response = await pool.query(query, [_userId, _newPass]);
    return response;
  }
}

module.exports = User;
