const mongoose = require("mongoose");
const Users = mongoose.model(
  "UserData",
  new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
      },
  })
);
module.exports = Users;


// users