const express = require('express');
const router = express.Router();
const User = require('../Models/userSchema');
  // ======
  // Create
  // ======
router.post('/add', async (req, res) => {
  
    const newEntry = new User(req.body);
   await newEntry.save( (err,result) => {
      if(err) {
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
  router.get('/getAllUsers', (req, res) => {  
    User.find( (err,result) => {
      if(err) {
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
router.get('/getUser/:id', async (req, res) => {

   await User.findById(req.params.id, (err,result) => {
      if(err) {
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
router.post('/updateUser/:id', (req, res) => {
    User.findByIdAndUpdate( req.params.id, { $set: req.body }, (err, result) => {
      if (err)
        res.sendStatus(500);
      else
        res.sendStatus(200);
    });
  });
  
  // ======
  // Remove
  // ======
router.post('/deleteUser/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id , (err, result) => {
      if (err)
      res.status(500).send(err);
      else
        res.sendStatus(200);
    });
  });

module.exports = router;