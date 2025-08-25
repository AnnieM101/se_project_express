const User = require("../models/user");
const bcrypt = require("bcryptjs");
const errorHandling = require("../utils/errors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const user = require("../models/user");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};
const createUser = (req, res, next) => {
  const { name, avatar } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({ name, avatar, email: req.body.email, password: hash })
    )
    .then((user) => User.findById(user._id).select("-password"))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).send({ message: "Duplicate email" });
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined || password === undefined) {
    res.status(400).send({ message: "Incorrect email or password" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { runValidators: true, new: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

module.exports = { getUsers, getCurrentUser, createUser, login, updateUser };
