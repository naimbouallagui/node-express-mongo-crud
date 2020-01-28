const BearerStrategy = require('passport-http-bearer');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const User = require('../Models/userSchema');

passport.use(new BearerStrategy(
  function (token, done) {
    jwt.verify(token,'secret',function(err, decoded) {
      if(err) throw err;
      console.log(decoded);
      
      User.findById( {_id: decoded.data._id}, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, true);
      });
    });
    
  }
));
