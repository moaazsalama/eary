const express = require('express');
const router = express.Router(); 
const conn = require("../../db/connection");

const AuthView = require('../../view/auth_view');
const AuthController = require('../../controller/auth_controller');


router.get('/users/:ID/approve', (req, res) => {
   AuthController.approveUser(req, res);
})
module.exports = router;