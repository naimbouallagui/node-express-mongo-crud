const express = require('express');
const router = express.Router();
const Product = require('../Models/productSchema');
  // ======
  // Create
  // ======
router.post('/addProduct', async (req, res) => {
    const newEntry = new Product(req.body);
   await newEntry.save( (err,result) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(result);
      }
    });
  });
  router.post('/addProduct2', async (req, res) => {
    const newEntry = new Product(req.body);
  const result =  await newEntry.save();
  res.send(result);
  });
  // =========
  // Read many
  // =========
  router.get('/getAllProducts', (req, res) => {  
    Product.find( (err,result) => {
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
router.get('/getProduct/:id', async (req, res) => {

   await Product.findById(req.params.id, (err,result) => {
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
router.post('/updateProduct/:id', (req, res) => {
    Product.findByIdAndUpdate( req.params.id, { $set: req.body }, (err, result) => {
      if (err)
        res.sendStatus(500);
      else
        res.sendStatus(200);
    });
  });
  
  // ======
  // Remove
  // ======
router.post('/deleteOne/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id , (err, result) => {
      if (err)
      res.status(500).send(err);
      else
        res.sendStatus(200);
    });
  });

module.exports = router;