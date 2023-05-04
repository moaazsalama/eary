const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();
const adminAuth = require("../../middleware/admin");
const conn = require("../../db/connection");
const parser = require('body-parser');
const AuthView = require('../../view/auth_view');

const auth = new AuthView();
router.post('/login', auth.login);

module.exports = router;