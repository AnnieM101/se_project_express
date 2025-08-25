const router = require("express").Router();
const { createUser, login } = require("../controllers/users");

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
