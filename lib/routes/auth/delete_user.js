const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const conn = require("../../db/connection");
const parser = require('body-parser');
const AuthController = require('../../controller/auth_controller');

router.delete('/user/:ID', auth,AuthController.deleteUser);

module.exports = router;