"use strict";

const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/user'),
      mailgun = require('../config/mailgun'),
      config = require('../config/main');

// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {
  res.status(200).json({
    token: 'JWT ' + generateToken(req.user),
    user: req.user
  });
}

//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  // Start database processing
  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        profile: { firstName: firstName, lastName: lastName, role: 1 }
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        res.status(201).json({
          token: 'JWT ' + generateToken(user),
          user: user
        });
      });
  });
}

//========================================
// Forgot Password Route
//========================================

exports.forgotPassword = function(req, res, next) {
  const email = req.body.email;

  User.findOne({ email: email }, function(err, existingUser) {
    // If user is not found, return error
    if (err || existingUser == null) {
      res.status(422).json({ error: 'No user was found with that email address.' });
      return next(err);
    }

      // If user is found, generate and save resetToken

      // Generate a token with Crypto
      crypto.randomBytes(48, function(err, buffer) {
        const resetToken = buffer.toString('hex');
        if (err) { return next(err); }

        existingUser.resetPasswordToken = resetToken;
        existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        existingUser.save(function(err) {
          // If error in saving token, return it
          if (err) { return next(err); }

          const message = {
            subject: 'Reset Password',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/resetpassword/' + resetToken + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          }

          // Otherwise, send user email via Mailgun
          mailgun.sendEmail(existingUser.email, message);

          res.status(200).json({ message: 'Please check your email for the link to reset your password.'});
          next();
        });
      });
  });
}

//========================================
// Reset Password Route
//========================================

exports.verifyToken = function(req, res, next) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, resetUser) {

    // If query returned no results, token expired or was invalid. Return error.
      if(!resetUser) {
        res.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
      }

      // Otherwise, save new password and clear resetToken from database
      resetUser.password = req.body.password;
      resetUser.resetPasswordToken = undefined;
      resetUser.resetPasswordExpires = undefined;

      resetUser.save(function(err) {
        if (err) { console.log(err); return next(err); }

        // If password change saved successfully, alert user via email
        const message = {
          subject: 'Password Changed',
          text: 'You are receiving this email because you changed your password. \n\n' +
          'If you did not request this change, please contact us immediately.'
        }

        // Otherwise, send user email confirmation of password change via Mailgun
        mailgun.sendEmail(resetUser.email, message);

        res.status(200).json({ message: 'Password changed successfully. Please login with your new password.'});
        next();
      });
  });
}

//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function(role) {
  return function(req, res, next) {
    User.findById(req.user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.profile.role >= role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
}
