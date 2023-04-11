const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();
const adminAuth = require("../../middleware/admin");
const conn = require("../../db/connection");
const parser = require('body-parser');
const AuthView = require('../../view/auth_view');
// const express = require('express');
// const router = express.Router();
//const login=[];
//get all data
// login request from client

// parse application/json
const auth = new AuthView();
router.post('/login', auth.login);

// router.post('/login', (req, res) => {

//     const data = req.body;

//     console.log(data);
//     userStatus = 1;
//     // model
//     conn.query("select * from user where status=? and email=? and password=?", [userStatus, data.email, data.password], (err, result, fields) => {
//         //controller
//         if (err) {
//             // console.log(err);
//         }
//         if (result) {
//             console.log(result);
//             res.send(result);
//         }
//         else {
//             res.statusCode = 404;
//             res.json({
//                 message: "not found",
//             });
//         }
//     });

// });

module.exports = router;