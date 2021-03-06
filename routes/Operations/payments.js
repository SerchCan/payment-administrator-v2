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

//Function for listing json
function date_returned(d, count) {

    d.setMonth((d.getMonth() + count))
    var month = new Array();
    month[0] = "Enero";
    month[1] = "Febrero";
    month[2] = "Marzo";
    month[3] = "Abril";
    month[4] = "Mayo";
    month[5] = "Junio";
    month[6] = "Julio";
    month[7] = "Agosto";
    month[8] = "Septiembre";
    month[9] = "Octubre";
    month[10] = "Noviembre";
    month[11] = "Diciembre";

    return month[d.getMonth()] + '/' + d.getFullYear();
}
// My next date
router.get('/NextDate/:plattform/', function (req, res, next) {
    var plattform = req.params.plattform;
    decoded = jwt.decode(req.cookies["Token"]);
    var IDUser = decoded["data"].ID_USER;
    var appData = {};
    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            //Supose user is the Admin of the plattform
            var query = "SELECT COUNT(ID_REGISTER) AS COUNT FROM REGISTERS WHERE ID_SERVICE = ? AND ID_USER = ?";
            connection.query(query, [plattform, IDUser], (err, rows) => {
                if (err) {
                    appData.data = "Error occurred on query";
                    res.status(400).json(appData);
                }
                var query = "SELECT CREATION_DATE FROM SERVICES WHERE ID_SERVICE = ?";
                connection.query(query, [plattform], (err, rowService) => {
                    if (err) {
                        appData.data = "Error occurred on query";
                        res.status(400).json(appData);
                    }
                    res.status(200).json({
                        date: date_returned(rowService[0].CREATION_DATE, rows[0].COUNT)
                    });
                })
            });
        }
        connection.release();
    })

});
// Next date of user
router.get('/NextDate/:plattform/:IDUser', function (req, res, next) {
    var plattform = req.params.plattform;
    var IDUser = req.params.IDUser;
    decoded = jwt.decode(req.cookies["Token"]);
    var appData = {};
    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            //Supose user is the Admin of the plattform
            var query = "SELECT COUNT(ID_REGISTER) AS COUNT FROM REGISTERS WHERE ID_SERVICE = ? AND ID_USER = ?";
            connection.query(query, [plattform, IDUser], (err, rows) => {
                if (err) {
                    appData.data = "Error occurred on query";
                    res.status(400).json(appData);
                }
                var query = "SELECT CREATION_DATE FROM SERVICES WHERE ID_SERVICE = ?";
                connection.query(query, [plattform], (err, rowService) => {
                    if (err) {
                        appData.data = "Error occurred on query";
                        res.status(400).json(appData);
                    }
                    res.status(200).json({
                        date: date_returned(rowService[0].CREATION_DATE, rows[0].COUNT)
                    });
                })
            });
        }
        connection.release();
    })

});
// Add payment of member
router.post('/:plattform/:IDUser', function (req, res, next) {
    var plattform = req.params.plattform;
    var IDUser = req.params.IDUser;
    decoded = jwt.decode(req.cookies["Token"]);
    var appData = {};
    database.getConnection((err, connection) => {
        if (err) {
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            //Supose user is the Admin of the plattform
            var query = "SELECT ID_USER FROM SERVICES WHERE ID_SERVICE = ?";
            connection.query(query, [plattform, decoded["data"].ID_USER], (err, rows) => {
                if (err) {
                    appData.data = "Error occurred on query";
                    res.status(400).json(appData);
                }
                if (rows[0].ID_USER == decoded["data"].ID_USER) {
                    var query = `INSERT INTO REGISTERS(DATE,ID_USER,ID_STATUS,ID_SERVICE)
                    VALUES(NOW(),?,2,?)`;
                    connection.query(query, [IDUser, plattform], (err, rows) => {
                        if (err) {
                            appData.data = "Error occurred on query";
                            res.status(400).json(appData);
                        }
                        appData.data = "Payment Sucessfully";
                        appData.error = 0;
                        res.json(appData);
                    });
                } else {
                    appData.data = "You're not the admin of the plattform";
                    appData.error = 400
                    res.status(400).json(appData);
                }
            });
        }
        connection.release();
    })
});



module.exports = router;