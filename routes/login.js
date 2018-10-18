var express=require('express');

var router = express.Router();

router.post('/signup', function(req, res, next) {
  res.send('respond with a resource');
  var user = {
      
    "mail":  req.body.mail,
    "password": req.body.password
  }
});

module.exports = router;