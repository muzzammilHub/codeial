const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_contoller');

router.get('/profile' , usersController.profile);


module.exports = router;