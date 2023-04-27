const { query } = require('../db/connection');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../model/authModel');
class AuthController {
    constructor() {
    }
    async login(req, res) {

        const data = req.body;
        //call service
        var result = await authModel.getUserByEmail(data.email);

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
            var a = await authModel.addUser(data);
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
            var result = await authModel.getAllPendingUsers();
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
            var result = await authModel.updateStatus(req.params.ID,1);
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
            var result = await authModel.updateStatus(req.params.ID,2);
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
}
module.exports = AuthController;