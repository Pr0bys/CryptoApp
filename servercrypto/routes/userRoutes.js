const express = require('express');
const router = express.Router();
const {registerUser, loginUser, verifyJWT} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyJWT);

module.exports = router