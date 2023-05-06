
const authModel = require('../model/authModel');

const AuthValidation = require('../helpers/validation');
const resHelper = require('../helpers/response');
const TokenGenerator = require('../helpers/token_generator');
const Encrypt = require('../helpers/decript');
class AuthController {
    authModel;
    constructor() {
        this.authModel = authModel;
    }
    async login(req, res) {

        const data = req.body;
        // console.log(data);

        var result = await this.authModel.getUserByEmail(data.email);

        //check if user exist in db
        result = JSON.parse(JSON.stringify(result));

        var user = result[0];
        if (user != null) {
            let x = Encrypt.encryptPassword(data.password);
            let y = user.password;
            // Encrypt.comparePassword(user.password, data.password);
            console.log(user.password);
            console.log(x);
            console.log(y);
            if (Encrypt.comparePassword(data.password, user.password) && user.status == 1) {
                const token = TokenGenerator.generate({ userId: user.ID });
                return resHelper.success(res, {
                    data: user,
                    token: token,
                },);
            }
            else
                if (user.status == 0)
                    return resHelper.error(res, "The account is not activated", 404);
                else
                    return resHelper.error(res, "The email or password is incorrect", 404);




        }
        else
            resHelper.error(res, "The email or password is incorrect", 404);




    }
    async register(data, res) {

        try {
            // encrypt password
            data.password = Encrypt.encryptPassword(data.password);
            var result = await this.authModel.addUser(data);
            //return  success response

            result = JSON.stringify(result);


            return resHelper.success(res, {
                data: result['insertId'],
            }, "User created successfully");


        }
        catch (err) {
            //return error response
            //check if email already exist
            if (err.errno == 1062) {
                return resHelper.error(res, "The email or Phone Number already exist", 400);

            }
            else if (err.errno == 1366) {
                return resHelper.error(res, "The email or Phone Number is not valid", 400);


            }



            else {
                console.log(err);
                return resHelper.error(res, {
                    "error": err,
                    message: "failed",
                }, 400);

            }

        }
        // parse to json


    }
    async getAllPendingUsers(req, res) {
        try {
            var result = await this.authModel.getAllPendingUsers();
            return resHelper.success(res,
                result,
                "success");
        }
        catch (err) {
            return resHelper.error(res, {
                "error": err,
            }, 400);
        }
    }
    async approveUser(req, res) {
        try {
            var result = await this.authModel.updateStatus(req.params.ID, 1);
            return resHelper.success(res, result, "User approved successfully");
        }
        catch (err) {
            return resHelper.error(res, err, 400);
        }
    }
    async rejectUser(req, res) {
        try {
            var result = await this.authModel.updateStatus(req.params.ID, 2);
            return resHelper.success(res, result, "User rejected successfully");
        }
        catch (err) {
            return resHelper.error(res, err, 400);
        }
    }
    async updateUser(req, res) {

        let notValid = AuthValidation.validateUpdateUser(req.body);


        if (notValid == null)
            return resHelper.error(res, notValid.error);
        else {
            const ID = req.params.ID;
            try {
                //
                req.body.password = Encrypt.encryptPassword(req.body.password);
                var result = await authModel.updateUser(ID, req.body);

                if (result.affectedRows == 0)
                    return resHelper.response(res, {}, "user not found", 400,);
                else
                    return resHelper.response(res, result[0], "User updated successfully", 200,);
            }
            catch (err) {

                resHelper.error(res, err);

            }
        }
    }
    async deleteUser(req, res) {
        try {
            var result = await authModel.deleteUser(req.params.ID);
            // return resHelper.success(res, result, "User deleted successfully");
            if (result.affectedRows == 0)
                return resHelper.response(res, {}, "user not found", 400,);
            else
                return resHelper.response(res, result[0], "User deleted successfully", 200,);
        }
        catch (err) {
            console.log(err);//
            return resHelper.error(res, err);
        }
    }

}
module.exports = new AuthController();
