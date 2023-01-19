var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Users = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require('passport-jwt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/user/register', (req, res, next) =>
{
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({email: email}, (err, user) =>
  {
    if(err) { throw err };
    if(user) { return res.status(403).json({email: "Email already in use."}); }
    else
    {
      bcrypt.genSalt(10, (err, salt) =>
      {
        bcrypt.hash(password, salt, (err, hash) =>
        {
          if(err) throw err;
          Users.create(
            {
              email: email,
              password: hash
            },
            (err, ok) =>
            {
              if(err) throw err;
              return res.send("ok");
            }
          );
        });
      });
    }
  });
});

router.post('/user/login', (req, res, next) =>
{
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({email: email}, (err, user) =>
  {
    if(err) throw err;
    if(!user) { return res.status(403).json({message: "Login faile :("}); }
    else
    {
      bcrypt.compare(password, user.password, (err, isMatch) =>
      {
        if(err) throw err;
        if(isMatch)
        {
          const jwtPayload = {
            email: user.email
          }
          jwt.sign(
            jwtPayload,
            'apples',
            {
              expiresIn: 1000
            },
            (err, token) =>
            {
              res.json({success: true, token});
            }
          );
        }
        else { return res.status(403).json({message: "Login faile :("}); }
      })
    }
  });
});

router.get('/private', (req, res, next) =>
{

});


module.exports = router;
