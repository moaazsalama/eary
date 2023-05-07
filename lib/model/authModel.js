//UsersModel is a class that extends the Model class

const db = require("../db/connection");
const utils = require("util");
const { mysql } = require("mysql");

class UserModel {
    constructor() {
    }
    // define the constructor

    // function from the Model class
    // this function is used to get all the users from the database
    async updateUser(id, user) {

        var params = [];
        var query = "update `user` set ";
        console.log(user);
        if (user['full_name']) {

            query += "`full_name`=? ,";
            params.push(user.full_name);
        }

        if (user['email']) {
            query += "`email`=? ,";
            params.push(user.email);
        }
        if (user['password']) {
            query += "`password`=? ,";
            params.push(user.password);
        }
        if (user['phone']) {
            query += "`phone`=? ,";
            params.push(user.phone);
        }
        if (user['status']) {
            query += "`status`=? ,";
            params.push(user.status);
        }
        if (user['type']) {
            query += "`type`=? ,";
            params.push(user.type);
        }
        //remove the last comma
        query = query.slice(0, -1);
        query += "where id=?";
        params.push(id);
        console.log(query);
        console.log(params);
        return utils.promisify(db.query).bind(db)(query, params);
    }
    async getAllUsers() {
        // define the query
        const query = "select * from user";
        // call the query function from the Model class
        return db.query(query);
    }
    // function from the Model class
    // this function is used to get a user from the database
    async getUserById(id) {
        const query = "select * from user where id=?";
        return utils.promisify(db.query).bind(db)(query, [id]);
    }
    async getUserByField(field, value) {
        const query = "select * from user where " + field + "=?";
    }
    // function from the Model class
    // this function is used to add a user to the database
    async addUser(user) {
        const query = "INSERT INTO `user`( `full_name`, `email`, `password`, `phone`,`status`,`type`) VALUES (?,?,?,?,?,?)";
        var result = await utils.promisify(db.query).bind(db)(query, [user.full_name, user.email, user.password, user.phone, '0', 0]);

        return result;

    }
    async deleteUser(id) {
        const query = "delete from user where id=?";
        return db.query(query, [id]);
    }
    //Async function to get user by email
    async getUserByEmail(email) {
        const query = "select * from user where email=? ";
        
        var item = await utils.promisify(db.query).bind(db)(query, [email]);
        return item;
    }

    async getAllPendingUsers() {
        const query = "select * from user where status=0";

        return utils.promisify(db.query).bind(db)(query);
    }
    // function from the Model class

    async updateStatus(id, status) {
        const query = "update user set status=? where id=?";
        return utils.promisify(db.query).bind(db)(query, [status, id]);
    }



}
module.exports = new UserModel();