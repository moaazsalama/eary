const express = require('express');
const router = express.Router();
const conn = require("../../db/connection");
const authMiddleware = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const AuthView = require('../../view/auth_view');
const AuthController = require('../../controller/auth_controller');


router.get('/pending_users', authMiddleware, admin, (req, res) => {
    new AuthController().getAllPendingUsers(req, res);

})
module.exports = router;