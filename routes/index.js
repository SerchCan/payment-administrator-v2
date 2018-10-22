var express = require('express');
var jwt = require('jsonwebtoken');
var path = require('path');
var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
    var token = req.cookies["Token"] || req.headers["token"];
    if (token) {
        jwt.verify(req.cookies["Token"], process.env.SECRET_KEY, function (err) {
            if (err) {
                res.render('index', {
                    title: 'Express'
                });
            } else {
                //if logged show dashboard
                res.status(200).redirect("/dashboard");
            }
        });
    } else {
        res.render('index', {
            title: 'Express'
        });
    }

});

module.exports = router;