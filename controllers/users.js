const User = require("../models/user");
const bcrypt = require("bcryptjs");
const errorHandling = require("../utils/errors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => errorHandling(err, req, res));
};
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => errorHandling(err, req, res));
};
const createUser = (req, res) => {
  const { name, avatar } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({ name, avatar, email: req.body.email, password: hash })
    )
    .then((user) => User.findById(user._id).select("-password"))
    .then((user) => res.status(201).send(user))
    .catch((err) => errorHandling(err, req, res));
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => errorHandling(err, req, res));
};

module.exports = { getUsers, getCurrentUser, createUser, login };
