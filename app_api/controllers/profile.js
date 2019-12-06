var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
    console.log("Registering user: " + req.body.email);
    res.status(200);
    res.json({
      "message" : "User registered: " + req.body.email
    });
  };

  module.exports.register = function(req, res) {
    var user = new User();
  
    user.name = req.body.name;
    user.email = req.body.email;
  
    user.setPassword(req.body.password);
  
    user.save(function(err) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    });
  };

 

module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};