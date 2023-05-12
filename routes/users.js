const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const usersController = require('../controllers/users_contoller');

router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.createSession)
router.get('/sign-out', usersController.destroySession);
router.post('/update/:id',passport.checkAuthentication, usersController.update)



module.exports = router;