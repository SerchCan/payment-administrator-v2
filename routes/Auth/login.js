var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var database = require("../../config/db");

process.env.SECRET_KEY = "PAYMENT_ADMIN";
var bcrypt = require('bcrypt')

router.post('/', function (req, res, next) {
    var appData = {
        "error": 1,
        "data": ""
    };
    var mail = req.body.mail;
    var password = req.body.password;

    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query("SELECT * FROM USERS WHERE MAIL=?", [mail], (err, rows) => {
                if (err) {
                    appData.data = "Error ocurred on query";
                    res.status(400).json(appData);
                } else {
                    if (rows.length > 0) {
                        bcrypt.compare(password, rows[0].PASSWORD, (err, match) => {
                            if (err) {
                                appData.data = "Error Ocurred on hashing";
                                res.status(400).json(appData)
                            }
                            if (match) {
                                //success
                                token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                                    expiresIn: "10h"
                                });
                                appData.token = token
                                res.cookie("Token", token);
                                res.status(200).json(appData)
                            } else {
                                appData.error = 1;
                                appData.data = "Email and password does not match";
                                res.status(204).json(appData);
                            }
                        });
                    } else {
                        appData.error = 1;
                        appData.data = "Email does not exists";
                        res.status(204).json(appData);
                    }
                }
            });
        }
        connection.release();
    })
});
/*
router.use(function (req, res, next) {
    var token = req.body.token || req.headers["token"];
    var appData = {};
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err) {
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
*/

module.exports = router;