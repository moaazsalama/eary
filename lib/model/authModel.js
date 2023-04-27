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
        const query = "INSERT INTO `user`( `firstName`, `lastName`, `email`, `password`, `phone`,`status`,`type`) VALUES (?,?,?,?,?,?,?)";
        var result = await utils.promisify(db.query).bind(db)(query, [user.firstName, user.lastName, user.email, user.password, user.phone, '0', 0]);

        return result;

    }
    // function from the Model class
    // this function is used to update a user in the database
    //    async create(user) {
    //         const query = "update user set name=?,email=?,password=?,phone=? where id=?";
    //         return db.query(query, [user.name, user.email, user.password, user.phone, user.id]);
    //     }
    // function from the Model class
    // this function is used to delete a user from the database
    async deleteUser(id) {
        const query = "delete from user where id=?";
        return db.query(query, [id]);
    }
    // function from the Model class
    // this function is used to get a user from the database by email and password
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