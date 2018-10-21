var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
var router = express.Router();

var database = require("../../config/db");

process.env.SECRET_KEY = "PAYMENT_ADMIN";

router.get('/', function (req, res, next) {
    res.clearCookie("Token");
    res.status(200).redirect("/login");
});
module.exports = router;