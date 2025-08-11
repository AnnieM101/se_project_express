const User = require("../models/user");
const errorHandling = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => errorHandling(res, req, err));
};
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => errorHandling(res, req, err));
};
const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => errorHandling(res, req, err));
};

module.exports = { getUsers, getUser, createUser };
