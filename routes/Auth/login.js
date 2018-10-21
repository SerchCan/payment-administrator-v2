var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
var path = require('path');
var router = express.Router();

var database = require("../../config/db");

process.env.SECRET_KEY = "PAYMENT_ADMIN";

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../pages/login.html'));
});
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
                    appData.data = "Error occurred on query";
                    res.status(400).json(appData);
                } else {
                    if (rows.length > 0) {
                        bcrypt.compare(password, rows[0].PASSWORD, (err, match) => {
                            if (err) {
                                appData.data = "Error Occurred on hashing";
                                res.status(400).json(appData)
                            }
                            if (match) {
                                //success
                                token = jwt.sign({
                                    data: rows[0]
                                }, process.env.SECRET_KEY, {
                                    expiresIn: 60 * 60 * 10
                                });
                                appData.error = 0;
                                appData.token = token;
                                res.cookie("Token", token);

                                res.redirect("/dashboard");

                            } else {
                                appData.error = 1;
                                appData.data = "Email and password does not match";
                                res.status(204).redirect("/login");

                            }
                        });
                    } else {
                        appData.error = 1;
                        appData.data = "Email does not exists";
                        res.status(204).redirect("/login");
                    }
                }
            });
        }
        connection.release();
    })
});
module.exports = router;