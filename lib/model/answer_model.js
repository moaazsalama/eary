//UsersModel is a class that extends the Model class

const db = require("../db/connection");
const utils = require("util");
const { mysql } = require("mysql");

class AnswerModel {

    // define the constructor

    // function from the Model class
    // this function is used to get all the users from the database
    async addAnswer(q_id, content, isTrue) {

        const query = 'INSERT INTO `answers`( `q_id`, `content`, `isTrue`) VALUES (?,?,?)';
        return utils.promisify(db.query).bind(db)(query, [q_id, content, isTrue]);
    }
    async getQuestion(id) {
        const query = "select * from answers where q_id=?";
        return utils.promisify(db.query).bind(db)(query, [id]);
    }
    async getAllQuestions() {
        // define the query
        const query = "select * from questions";
        // call the query function from the Model class
        return db.query(query);
    }

    // function from the Model class
    // this function is used to update a user in the database
    //    async create(user) {
    //         const query = "update user set name=?,email=?,password=?,phone=? where id=?";
    //         return db.query(query, [user.name, user.email, user.password, user.phone, user.id]);
    //     }
    // function from the Model class
    // this function is used to delete a user from the database
    async deleteQuestion(id) {
        const query = "delete from questions where q_id=?";
        return db.query(query, [id]);
    }
    async updateQuestion(id, question) {

        var params = [];
        var query = "update questions set ";
        if (question['content']) {

            query += "`content`=? ,";
            params.push(question.content);
        }
        if (question['score']) {
            query += "`score`=? ,";
            params.push(question.score);
        }
        if (question['answer_id']) {
            query += "`answer_id`=? ,";
            params.push(question.answer_id);
        }
        //remove the last comma
        query = query.slice(0, -1);
        query += "where q_id=?";
        params.push(id);
        console.log(query);
        console.log(params);


        return utils.promisify(db.query).bind(db)(query, params);
    }
    // function from the Model class
    // this function is used to get a user from the database by email and password
    // }

    // function from the Model class





}
module.exports = new AnswerModel;