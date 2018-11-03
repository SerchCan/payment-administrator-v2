var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
var path = require('path');
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
//Plattforms where the users is the administrator
router.get('/Admin_Plattforms', function (req, res, next) {
    appData = {};
    decoded = jwt.decode(req.cookies["Token"]);

    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query("SELECT * FROM SERVICES WHERE ID_USER = ? AND STATUS=1 ORDER BY(services.CREATION_DATE)", [decoded["data"].ID_USER], (err, rows) => {
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
                     WHERE pivot.ID_USER = ?  AND services.STATUS=1
                     ORDER BY(services.CREATION_DATE)`;
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
// Create plattform
router.post('/Create/', function (req, res, next) {
    var appData = {};
    var name = req.body.Name;
    var price = req.body.Price;

    decoded = jwt.decode(req.cookies["Token"]);

    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            var query = `INSERT INTO SERVICES (NAME,PRICE,CREATION_DATE,STATUS,ID_USER) VALUES (?,?,NOW(),1,?)`;
            connection.query(query, [name, price, decoded["data"].ID_USER], (err, rows) => {
                if (err) {
                    appData.data = "Error occurred on query";
                }
                appData.data = "Inserted successfully";

            });
            var query = `UPDATE USERS
                SET ID_TYPE=2
                WHERE ID_USER=?`;
            connection.query(query, [decoded["data"].ID_USER], (err, rows) => {
                if (err) {
                    appData.data = "Error occurred on query";
                }
                appData.data = "Inserted successfully";

            });
            var query = "SELECT * FROM USERS WHERE ID_USER=?";
            connection.query(query, [decoded["data"].ID_USER], (err, rows) => {
                if (err) {
                    appData.data = "Error occurred on query";
                }
                token = jwt.sign({
                    data: rows[0]
                }, process.env.SECRET_KEY, {
                    expiresIn: 60 * 60
                });


                res.cookie("Token", token).send("cookie sended");
            });
        }
        connection.release();
    })
});
// Edit plattform
router.post('/edit/', function (req, res, next) {
    var plattform = req.body.Plattform;
    var name = req.body.Name;
    var price = req.body.Price;
    var appData = {};
    decoded = jwt.decode(req.cookies["Token"]);
    if (decoded["data"].ID_TYPE == 2) {
        database.getConnection((err, connection) => {
            if (err) {
                appData.data = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                var query = `UPDATE SERVICES SET NAME = ?, PRICE = ? WHERE ID_SERVICE = ? AND ID_USER = ?`;
                connection.query(query, [name, price, plattform, decoded["data"].ID_USER], (err, rows) => {
                    if (err) {
                        appData.data = "Error occurred on query";
                        res.status(400).json(appData);
                    }
                    appData.data = "Updated Successfully";
                    res.json(appData);
                });
            }
            connection.release();
        })
    } else {
        appData.data = "You don't have permissions for this operation";
        appData.error = -1;
        res.json(appData)
    }
});
// Delete plattform
router.get('/delete/:plattform', function (req, res, next) {
    var plattform = req.params.plattform;
    decoded = jwt.decode(req.cookies["Token"]);
    var appData = {};
    console.log(decoded);
    if (decoded["data"].ID_TYPE == 2) {
        database.getConnection((err, connection) => {
            if (err) {
                appData.data = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                var query = `UPDATE SERVICES SET STATUS=0 WHERE ID_SERVICE = ? AND ID_USER = ?`;
                connection.query(query, [plattform, decoded["data"].ID_USER], (err, rows) => {
                    if (err) {
                        console.log(err)
                        appData.data = "Error occurred on query";
                        res.status(400).json(appData);
                    }
                    appData.data = "Deleted Successfully";
                    res.redirect("/dashboard")
                });
            }
            connection.release();
        })
    } else {
        appData.data = "You don't have permissions for this operation";
        appData.error = -1;
        res.json(appData)
    }
});

// Add member to plattform
router.post('/Member/', function (req, res, next) {
    var appData = {};
    var IdOrEmail = req.body.IdOrEmail;
    var plattform = req.body.plattform;

    decoded = jwt.decode(req.cookies["Token"]);

    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            var query = `INSERT INTO pivot(ID_SERVICE,ID_USER) 
            SELECT DISTINCT ?, users.ID_USER FROM users INNER JOIN services
            WHERE (users.ID_USER=? OR users.MAIL=?) AND services.ID_USER=?`;
            connection.query(query, [plattform, IdOrEmail, IdOrEmail, decoded["data"].ID_USER], (err, rows) => {
                if (err) {
                    appData.data = "Error occurred: Probabbly you're not the admin of the plattform";
                    res.status(400).json(appData);
                } else {
                    appData.data = "Added successfully";
                    res.json(appData);
                }
            });
        }
        connection.release();
    })
});
module.exports = router;