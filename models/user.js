const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const errorHandling = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: { type: String, required: true, select: false },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .orFail(() => {
      const err = new Error("Incorrect email or password");
      err.code = 401;
      return err;
    })
    .then((user) => {
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error("Incorrect email or password");
          err.code = 400;
          return Promise.reject(err);
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
