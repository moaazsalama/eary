//UsersModel is a class that extends the Model class

const db = require("../db/connection");
const utils = require("util");
const { mysql } = require("mysql");

class QuestionModel {

    // define the constructor
    constructor() { }

    // function from the Model class
    // this function is used to get all the users from the database
    async addQuestion(question, filePath) {
        console.log(question);
        // console.log(filePath);
        console.log("add question");
        const query = 'INSERT INTO `questions`( `content`, `audio_path`,`score`) VALUES (?,?,?)';
        return utils.promisify(db.query).bind(db)(query, [question.content, filePath, question.score]);
    }
    async getQuestion(id) {
        const query = "select * from questions where q_id=?";
        return utils.promisify(db.query).bind(db)(query, [id]);
    }
    async getAllQuestions() {
        // define the query
        //get for each question the available answers

        const query = "select * from questions";
        // call the query function from the Model class
        return utils.promisify(db.query).bind(db)(query);
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
    async getQuestions() {
        const query = "select * from questions";
        return utils.promisify(db.query).bind(db)(query);
    }
}
module.exports = new QuestionModel();