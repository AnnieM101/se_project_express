const errorHandling = (res, req, err) => {
  console.warn(err);
  if (err.name === "CastError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: err.message });
  } else {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = errorHandling;
