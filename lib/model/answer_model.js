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
    async getAnswer(id) {
        const query = "select * from answers where q_id=?";
        return utils.promisify(db.query).bind(db)(query, [id]);
    }
    async getAllAnswers() {
        // define the query
        const query = "select * from answers";
        // call the query function from the Model class
        return utils.promisify(db.query).bind(db)(query);
    }

    async deleteAnswers(id) {
        const query = "delete from questions where q_id=?";
        return utils.promisify(db.query).bind(db)(query, [id]);
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






}
module.exports = new AnswerModel();
