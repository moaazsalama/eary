const { query } = require('../db/connection');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../model/authModel');
const Joi = require('joi');
class AuthController {
    authModel;
    constructor() {
        this.authModel = model;
    }
    async login(req, res) {

        const data = req.body;
        //call service
        var result = await this.authModel.getUserByEmail(data.email);

        //check if user exist in db
        var a = JSON.parse(JSON.stringify(result));


        console.log(a);
        var user = a[0];
        //get value from promisers


        //    console.log(user.start());
        if (user != null) {

            if (user.password == data.password && user.status == 1) {
                const token = jwt.sign({ userId: user.ID }, 'secretkey@123', { expiresIn: '1h' });

                res.send({
                    message: "success",
                    status: 200,
                    data: user,
                    token: token,
                });
            }
            else {
                if (user.status == 0) {
                    res.statusCode = 404;
                    res.json({
                        message: "The account is not activated",
                        status: 404,
                    });
                }
                else {
                    res.statusCode = 404;
                    res.json({
                        message: "The email or password is incorrect or the account is not activated",
                        status: 404,
                    });
                }
            }
        }
        else {
            res.statusCode = 404;
            res.json({
                message: "not found",
            });
        }


    }
    async register(data, res) {

        try {
            var a = await this.authModel.addUser(data);
            //return  success response

            var result = JSON.stringify(a);
            res.send(
                {
                    message: "User created successfully",
                    status: 200,
                    data: a['insertId'],
                });
            return result;
        }
        catch (err) {
            //return error response
            res.statusCode = 400;
            //check if email already exist
            if (err.errno == 1062) {
                res.json({
                    message: "The email or Phone Number already exist",
                    status: 400,
                });
            }
            else if (err.errno == 1366) {
                res.json({
                    message: "The email or Phone Number is not valid",
                    status: 400,
                });
            }



            else {
                console.log(err);
                res.json({
                    message: "failed save",
                    "error": err,
                    status: 400,
                });
            }

        }
        // parse to json


    }
    async getAllPendingUsers(req, res) {
        try {
            var result = await this.authModel.getAllPendingUsers();
            res.send(
                {
                    message: "success",
                    status: 200,
                    data: result,
                });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({
                message: "failed",
                "error": err,
                status: 400,
            });
        }
    }
    async approveUser(req, res) {
        try {
            var result = await this.authModel.updateStatus(req.params.ID, 1);
            res.send(
                {
                    message: "User approved successfully",
                    status: 200,
                    // data: result,
                });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({
                message: "failed",
                "error": err,
                status: 400,
            });
        }
    }
    async rejectUser(req, res) {
        try {
            var result = await this.authModel.updateStatus(req.params.ID, 2);
            res.send(
                {
                    message: "User rejected successfully",
                    status: 200,
                    // data: result,
                });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({
                message: "failed",
                "error": err,
                status: 400,
            });
        }
    }
    async updateUser(req, res) {

        let notValid = AuthController.validateUpdateUser(req.body);
        console.log(notValid);
        console.log("ZzZZZZZ");
        if (notValid != false) {
            res.statusCode = 400;
            res.json({
                message: "failed",
                "error": notValid.error,
                status: 400,
            });
            return;
        }
        else {
            const ID = req.params.ID;
            try {
                var result = await this.authModel.updateUser(ID, req.body);
                console.log(result);
                if (result.affectedRows == 0) {
                    res.statusCode = 400;
                    res.json({
                        message: "failed",
                        "error": "user not found",
                        status: 400,
                    });
                    return;
                } else {

                    res.send(
                        {
                            message: "User updated successfully",
                            status: 200,
                            data: result[0],
                        });
                }
            }
            catch (err) {
                console.log(err);
                res.statusCode = 400;
                res.json({
                    message: "failed",
                    "error": err,
                    status: 400,
                });
            }
        }
    }

    async deleteUser(req, res) {
        try {
            var result = await this.authModel.deleteUser(req.params.ID);
            res.send(
                {
                    message: "User deleted successfully",
                    status: 200,
                    // data: result,
                });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({
                message: "failed",
                "error": err,
                status: 400,
            });
        }
    }
    static validateUpdateUser(body) {
        //validation schema
        const schema = Joi.object({
            full_name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            phone: Joi.string().optional(),
            password: Joi.string().optional(),
            status: Joi.number().optional(),
        });

        let result = schema.validate(body);
        console.log(result);
        if (result.error) {
            return result;
        }
        else {
            return false;
        }

    }
}
module.exports = new AuthController();