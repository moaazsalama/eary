const express = require('express');
const router = express.Router();
const adminAuth = require("../middleware/admin");
const conn = require("../db/connection");
const parser = require('body-parser');
const AuthController = require('../controller/auth_controller');
class AuthView {
    // authController;
    constructor() {
    }
    async login(req, res) {
        return new AuthController().login(req, res);
        //  this.authController.login(req, res);
    }
    async register(data, res) {
        return new AuthController().register(data, res);
    }

}
module.exports = AuthView;