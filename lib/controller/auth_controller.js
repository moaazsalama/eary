const { query } = require('../db/connection');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../model/authModel');
class AuthController {

    async login(req, res) {

        const data = req.body;
        //call service
        var a = await authModel.getUserByEmail(data.email);

        //extract data from query dat to Json




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
                res.statusCode = 404;
                res.json({
                    message: "The email or password is incorrect or the account is not activated",
                    status: 404,
                });
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
            var a = await new authModel.addUser(data);
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
            console.log(err);
            res.json({
                message: "failed save",
                "error": err,
                status: 400,
            });
        }
        // parse to json


    }
}
module.exports = AuthController;