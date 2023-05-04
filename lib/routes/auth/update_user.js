const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const conn = require("../../db/connection");
const parser = require('body-parser');
const AuthController = require('../../controller/auth_controller');
const app=express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
router.put('/user/:ID', auth,AuthController.updateUser);

module.exports = router;