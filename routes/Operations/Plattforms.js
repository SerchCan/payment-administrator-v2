var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
var path = require('path');
var router = express.Router();

var database = require("../../config/db");

process.env.SECRET_KEY = "PAYMENT_ADMIN";

// If not logged
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
//Plattforms where the users is the administrator
router.get('/Admin_Plattforms', function (req, res, next) {
    appData = {};
    decoded = jwt.decode(req.cookies["Token"]);

    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query("SELECT * FROM SERVICES WHERE ID_USER = ?", [decoded["data"].ID_USER], (err, rows) => {
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
//Plattforms where the users is only part of
router.get('/User_Plattforms', function (req, res, next) {
    appData = {};
    decoded = jwt.decode(req.cookies["Token"]);

    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            query = `SELECT DISTINCT services.ID_SERVICE, services.NAME, services.PRICE, services.ID_USER 
                     FROM services join pivot INNER JOIN users 
                     WHERE pivot.ID_USER = ?`;
            connection.query(query, [decoded["data"].ID_USER], (err, rows) => {
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