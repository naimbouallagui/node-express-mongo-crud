const express = require('express');
const bodyParser = require('body-parser');
 require('./Database/db')
const app = express();// execute the package express
const productApi = require('./APIs/productApi')
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/products',productApi);

// listen to port of node
app.listen(3000);