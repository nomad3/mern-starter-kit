//import dependencies
const express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');

// import controllers
const _authController = require('./controllers/_auth-control');


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  const apiRoutes = express.Router(),
        authRoutes = express.Router();

//==================
// AUTHORIZATION ROUTES
//==================
  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/login', requireLogin, _authController.login); //login
  authRoutes.post('/register', _authController.register); //register
  authRoutes.post('/forgotpassword', _authController.forgotPassword); //forgot password
  authRoutes.post('/resetpassword/:token', _authController.verifyToken); //verify password change

  // use all the routes
  app.use('/api', apiRoutes);
}
