const axios = require("axios");
const baseUrl = "http://localhost:3001";

const signInService = async (input) => {
  try {
    const { data } = await axios.post(`${baseUrl}/signin`, {
      username: input.username,
      password: input.password,
    });
    return { token: data.token, success: true };
  } catch (error) {
    if (error?.response?.data) {
      return { success: false, message: error.response.data.message };
    }
  }
};

const getUserDataService = async (token) => {
  try {
    const { data } = await axios.post(`${baseUrl}/user/info`, {
      token: token,
    });
    return data.info;
  } catch (error) {
    if (error?.response?.data) {
      console.log(error.response.data);
    }
  }
};

const signUpService = async (input) => {
  try {
    await axios.post(`${baseUrl}/user/create`, {
      username: input.username,
      password: input.password,
      email: input.email,
      firstname: input.firstName,
      lastname: input.lastName,
    });
    return { success: true };
  } catch (error) {
    if (error?.response?.data) {
      return { success: false, message: error.response.data.message };
    }
  }
};

module.exports = { signInService, getUserDataService, signUpService };
