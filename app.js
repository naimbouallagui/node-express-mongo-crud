const express = require('express');
const bodyParser = require('body-parser');
require('./Database/db');
require('./config/passport');
const app = express();// execute the package express
const productApi = require('./APIs/productApi');
const userApi = require('./APIs/userApi');
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/products', productApi);
app.use('/api/users', userApi);




// listen to port of node
app.listen(3000);