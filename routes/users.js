var express = require('express');
var router = express.Router();
const Users = require("../models/User");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/user/register', (req, res, next) =>
{
  const email = req.body.email;
  const password = req.body.password;
});

module.exports = router;
