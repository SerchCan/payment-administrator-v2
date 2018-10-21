var express = require('express');
var jwt = require('jsonwebtoken');
var path = require('path');
var router = express.Router();


process.env.SECRET_KEY = "PAYMENT_ADMIN";

router.use(function (req, res, next) {
    var token = req.cookies["Token"] || req.headers["token"];
    if (token) {
        jwt.verify(req.cookies["Token"], process.env.SECRET_KEY, function (err) {
            if (err) {
                res.status(204).redirect("/login");
            } else {
                next();
            }
        });
    } else {
        res.status(204).redirect("/login");
    }
});
router.use(function (req, res, next) {
    res.status(200).sendFile(path.join(__dirname, '../../pages/dashboard.html'));
});

module.exports = router;