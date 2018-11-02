var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var database = require("../../config/db");

process.env.SECRET_KEY = "PAYMENT_ADMIN";

// Middleware
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
// Return list of members
router.get('/members', function (req, res, next) {
    appData = {};
    decoded = jwt.decode(req.cookies["Token"]);

    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            sql = `SELECT users.ID_USER AS ID_U, users.NAME as NAME, users.LAST_NAME as LASTNAME, services.NAME as PLATTFORM, services.ID_SERVICE as ID_S, services.PRICE as PRICE 
            from users INNER JOIN services join pivot 
            WHERE SERVICES.ID_USER=? AND pivot.ID_SERVICE=services.ID_SERVICE and users.ID_USER!=?
            ORDER BY(services.CREATION_DATE)`
            connection.query(sql, [decoded["data"].ID_USER, decoded["data"].ID_USER], (err, rows) => {
                if (err) {
                    appData.data = "Error occurred on query";
                    res.status(400).json(appData);
                }
                res.json(rows);
            });
        }
        connection.release();
    })
});

module.exports = router;