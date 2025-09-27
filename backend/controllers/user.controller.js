const Product = require("../models/user.model");
const bcrypt = require("bcrypt")

const getUser = async (req, res)  =>  {
  const User = await res.send('Login page or login logic');

}

module.exports = {
    getUser,
};