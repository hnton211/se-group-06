const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fsakjqwb1";

const userCreate = async (req, res) => {
  try {
    const checkUserResponse = await User.findAccount(req.body.username);
    if (checkUserResponse.rowCount > 0)
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "Username already exists" });

    const document = await User.createAccount(req.body);
    res.code(StatusCodes.OK).send(document);
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res) => {
  try {
    const checkUserResponse = await User.findAccount(req.body.username);
    console.log(checkUserResponse);
    if (checkUserResponse.rowCount === 0)
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "Username not found !" });
    const checkUser = checkUserResponse.rows;
    const hashed_password = checkUser[0].password;

    if (!User.comparePassword(req.body.password, hashed_password)) {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "Password is incorrect !" });
    }
    const token = jwt.sign({ userId: checkUser[0].id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.code(StatusCodes.OK).send({ token });
  } catch (e) {
    console.log(e);
  }
};

const getInfo = async (req, res) => {
  try {
    const token = req.body.token;
    const checkUserResponse = await User.decodeToken(token, res);

    if (checkUserResponse.rowCount === 0) {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "User not found!" });
    }
    const checkUser = checkUserResponse.rows;

    const info = {
      username: checkUser[0].username,
      email: checkUser[0].email,
      firstName: checkUser[0].firstname,
      lastName: checkUser[0].lastname,
    };

    res.code(StatusCodes.OK).send({ info });
  } catch (e) {
    req.log.error(e);
  }
};

//Edit firstname, lastname of user
const editUsername = async (req, res) => {
  try {
    const token = req.body.token;
    const checkUserResponse = await User.decodeToken(token, res);

    //If there is no matching user
    if (checkUserResponse.rowCount === 0) {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "User not found!" });
    }
    const checkUser = checkUserResponse.rows;

    const document = await User.editName(
      checkUser[0].id,
      req.body.firstName,
      req.body.lastName
    );
    res.code(StatusCodes.OK).send(document);
  } catch (error) {
    console.log(error);
  }
};

//Edit Email of User
const editUserEmail = async (req, res) => {
  try {
    const token = req.body.token;
    const checkUserResponse = await User.decodeToken(token, res);

    //If there is no matching user
    if (checkUserResponse.rowCount === 0) {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "User not found!" });
    }
    const checkUser = checkUserResponse.rows;

    const document = await User.editEmail(checkUser[0].id, req.body.email);
    res.code(StatusCodes.OK).send(document);
  } catch (error) {
    console.log(error);
  }
};

//Edit password of User
const editUserPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const checkUserResponse = await User.decodeToken(token, res);

    //If there is no matching user
    if (checkUserResponse.rowCount === 0) {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "User not found!" });
    }
    const checkUser = checkUserResponse.rows;
    const hashed_password = checkUser[0].password;

    if (!User.comparePassword(req.body.password, hashed_password)) {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: "Password is incorrect !" });
    }

    const document = await User.editPass(checkUser[0].id, req.body.newPassword);
    res.code(StatusCodes.OK).send(document);
  } catch (error) {
    console.log(error);
  }
};

//View all users
const userView = async (req, res) => {
  try {
    const document = await User.viewAccount();
    res.send(document);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userCreate,
  userView,
  signIn,
  getInfo,
  editUsername,
  editUserEmail,
  editUserPassword,
};
