const STATUS_CODE = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  DUPLICATE_EMAIL: 409,
};

const ERROR_MESSAGE = {
  NOT_FOUND: "Requested resource not found",
  INTERNAL_SERVER_ERROR: "An unexpected error occurred",
  BAD_REQUEST: "Invalid request data",
  DUPLICATE_EMAIL: "Email already in use",
};
const errorHandling = (err, req, res) => {
  console.warn(err);
  if (err.name === "CastError") {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .send({ message: ERROR_MESSAGE.BAD_REQUEST });
  }
  if (err.name === "ValidationError") {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .send({ message: ERROR_MESSAGE.BAD_REQUEST });
  }
   if (err.code === 11000) {
      return res
        .status(STATUS_CODE.DUPLICATE_EMAIL)
        .send({ message: ERROR_MESSAGE.DUPLICATE_EMAIL });
    }
  if (err.name === "DocumentNotFoundError") {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .send({ message: ERROR_MESSAGE.NOT_FOUND });
  } else {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

module.exports = errorHandling;
