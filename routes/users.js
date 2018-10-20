var jwt = require('jsonwebtoken')
var express = require('express');
var router = express.Router();
process.env.SECRET_KEY = "PAYMENT_ADMIN";

router.use(function (req, res, next) {
    var token = req.cookies["Token"] || req.headers["token"];
    var appData = {};
    if (token) {
        jwt.verify(req.cookies["Token"], process.env.SECRET_KEY, function (err) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Token is invalid";
                res.status(500).json(appData);
            } else {
                next();
            }
        });
    } else {
        appData["error"] = 1;
        appData["data"] = "Please send a token";
        res.status(403).json(appData);
    }
});

/* GET users listing. */
router.get('/', function (req, res, next) {

    res.send('respond with a resource');
});

module.exports = router;