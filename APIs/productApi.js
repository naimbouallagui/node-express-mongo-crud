const express = require('express');
const router = express.Router();
const ProductModel = require('../Models/productSchema').ProductModel;
const multer = require('multer');
const path = require('path');
// const upload = multer({ dest: 'uploads/' });
// ======
// Create
// ======
router.post('/addProduct', async (req, res) => {
  const newEntry = new ProductModel(req.body);
  await newEntry.save((err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});
router.post('/addProduct2', async (req, res) => {
  const newEntry = new ProductModel(req.body);
  const result = await newEntry.save();
  res.send(result);
});
// =========
// Read many
// =========
router.get('/getAllProducts', (req, res) => {
  ProductModel.find((err, result) => {
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
router.get('/getProduct/:id', async (req, res) => {
  
  await ProductModel.findById(req.params.id, (err, result) => {
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
router.post('/updateProduct/:id', (req, res) => {
  ProductModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, result) => {
    if (err)
    res.sendStatus(500);
    else
    res.sendStatus(200);
  });
});

// ======
// Remove
// ======
router.post('/deleteProduct/:id', (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id, (err, result) => {
    if (err)
    res.status(500).send(err);
    else
      res.sendStatus(200);
    });
  });
  
  // define multer storage configuration     
  const storage = multer.diskStorage({
  destination : function(req,file,callback){
    callback(null, './images');
  },
  filename: function(req,file,callback){
      callback(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage : storage});

  // ======
  // Upload Image
  // ======
  
  router.post('/uploadImage', upload.single('image'), async (req, res) => {
    try {
      await res.send(req.file);
    } catch (err) {
       res.send(400);
    }
  });

  router.post('/getImage/:nameImage', upload.single('image'), async (req, res) => {
   await res.sendFile(path.join(__dirname, '../images/' + req.params.nameImage));
  });

module.exports = router;