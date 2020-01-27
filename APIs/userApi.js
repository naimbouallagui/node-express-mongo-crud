const express = require('express');
const router = express.Router();
const User = require('../Models/userSchema');
const bearer = require('passport-http-bearer');
const passport = require('passport');
const jwt = require('jsonwebtoken')
require('../config/passport');

// ======
// Create
// ======
router.post('/add',  passport.authenticate('bearer', { session: false }),
async (req, res) => {

  const newEntry = new User(req.body);
  await newEntry.save((err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});
// =========
// Read many
// =========
router.get('/getAllUsers',  passport.authenticate('bearer', { session: false }),
(req, res) => {
  User.find((err, result) => {
    if (err) {
      res.status(500).send(e);
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

// ========
// Read one
// ========
router.get('/getUser/:id',  passport.authenticate('bearer', { session: false }),
async (req, res) => {

  await User.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

// ======
// Update
// ======
router.post('/updateUser/:id',  passport.authenticate('bearer', { session: false }),
(req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, result) => {
    if (err)
      res.sendStatus(500);
    else
      res.sendStatus(200);
  });
});

// ======
// Remove
// ======
router.post('/deleteUser/:id',  passport.authenticate('bearer', { session: false }),
(req, res) => {
  User.findByIdAndDelete(req.params.id, (err, result) => {
    if (err)
      res.status(500).send(err);
    else
      res.sendStatus(200);
  });
});

router.post('/login',  function (req, res) {
  console.log(req.body)
  User.findOne({email: req.body.email}, (err, userFound) => {
    if(err) res.send(err);
    console.log(userFound)
    var token = jwt.sign({data: userFound}, 'secret', { expiresIn: '1y' });
    res.send({access_token: token});
  })
  });
module.exports = router;