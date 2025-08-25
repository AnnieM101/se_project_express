const router = require('express').Router();
const { getCurrentUser, getUsers, createUser, login } = require('../controllers/users');
const {auth} = require("./middlewares/auth");

router.post('/signin', login);
router.post('/signup', createUser);
router.get('/me', auth, getCurrentUser);

module.exports = router;