var express = require('express');
var router = express.Router();
var database = require("../../config/db");
process.env.SECRET_KEY = "PAYMENT_ADMIN";
var bcrypt = require('bcrypt')
const saltRounds = 10;

router.post('/', function (req, res, next) {
    var appData = {
        "error": 1,
        "data": ""
    };
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            appData.Data = "Error ocurred on hashing";
            res.status(400).json(appData);
        }
        var user = {
            "NAME": req.body.fname,
            "LAST_NAME": req.body.lname,
            "MAIL": req.body.mail,
            "PASSWORD": hash,
            "ID_TYPE": 1
        };
        database.getConnection((err, connection) => {
            if (err) {
                appData.error = 1;
                appData.Data = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                connection.query('INSERT INTO USERS SET ?', user, (err, row, field) => {
                    if (!err) {
                        appData.error = 0
                        appData.Data = "User registered successfully";
                        res.status(201).json(appData);
                    } else {
                        appData.data = "Error Occurred on query";
                        res.status(400).json(appData);
                    }
                });
                connection.release();
            }
        });
    });
});


module.exports = router;