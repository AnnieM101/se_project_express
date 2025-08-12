const ClothingItem = require("../models/clothingItem");
const errorHandling = require("../utils/errors");
const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => {
      console.log(item);
      res.status(200).send(item);
    })
    .catch((err) => errorHandling(res, req, err));
};
const createClothingItem = (req, res) => {
  console.log(req);
  console.log(req.user._id);
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.status(201).send({ data: item });
    })
    .catch((err) => errorHandling(res, req, err));
};
const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({}))
    .catch((err) => errorHandling(res, req, err));
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => errorHandling(res, req, err));

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => errorHandling(res, req, err));

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
