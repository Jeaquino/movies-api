const express = require('express');
const router = express.Router();
const {login} = require('../../controllers/api/usersController');

router
.post('/login', login)


module.exports = router;