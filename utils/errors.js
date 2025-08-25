const STATUS_CODE = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  INCORRECT_CREDENTIAL_ERROR: 401,
  CONFLICT_ERROR: 409,
};

const ERROR_MESSAGE = {
  NOT_FOUND: "Requested resource not found",
  INTERNAL_SERVER_ERROR: "An unexpected error occurred",
  BAD_REQUEST: "Invalid request data",
  CONFLICT_ERROR: "Email already in use",
  INCORRECT_CREDENTIAL_ERROR:"The email or password you entered is incorrect"
};
const errorHandling = (err, req, res, next) => {
  console.warn(err);
  if(err.message ==="Incorrect email or password"){
    return res.status(STATUS_CODE.INCORRECT_CREDENTIAL_ERROR).send({message: ERROR_MESSAGE.INCORRECT_CREDENTIAL_ERROR});
  }
  if (err.message === "CastError") {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .send({ message: ERROR_MESSAGE.BAD_REQUEST });
  }
  if (err.message === "ValidationError") {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .send({ message: ERROR_MESSAGE.BAD_REQUEST });
  }
  if (err.message === "DocumentNotFoundError") {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .send({ message: ERROR_MESSAGE.NOT_FOUND });
  }
  if (err.code === 11000) {
    return res
      .status(STATUS_CODE.CONFLICT_ERROR)
      .send({ message: ERROR_MESSAGE.CONFLICT_ERROR });
  }
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  };

module.exports = errorHandling;
