const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/users/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Add more routes for registration, logout, etc.

module.exports = router;