var express = require('express');
var jwt = require('jsonwebtoken');
var path = require('path');
var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
    var token = req.cookies["Token"] || req.headers["Token"];
    if (token) {
        jwt.verify(req.cookies["Token"], process.env.SECRET_KEY, function (err) {
            if (err) {
                res.status(200).redirect("/login");
            } else {
                //if logged show dashboard
                res.status(200).redirect("/dashboard");
            }
        });
    } else {
        res.status(200).redirect("/login");
    }

});

module.exports = router;