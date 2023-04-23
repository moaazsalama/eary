const express = require('express');
const bodyParser = require('body-parser');
const login = require('./lib/routes/auth/login');
const register = require('./lib/routes/auth/register');
const question = require('./lib/routes/questions/create_question');
const getQuestion = require('./lib/routes/questions/get_question');
const updateQuestion = require('./lib/routes/questions/update_question');
const deleteQuestion = require('./lib/routes/questions/delete_question');
const createAnswer = require('./lib/routes/answers/create_answer');
const getAnswers = require('./lib/routes/answers/get_answers');
const exam = require('./lib/routes/exam/take_exam');
const getAllExams = require('./lib/routes/exam/get_exam_histories');
const getAllQuestion = require('./lib/routes/questions/get_all_questions');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.raw());
// app.use(bodyParser.text());


//for import eary route
app.use("", login, deleteQuestion, question, getQuestion,getAllQuestion ,updateQuestion, createAnswer, getAnswers, register,exam,getAllExams);
app.listen(4000, "localhost", () => {
    console.log("server");
});
// create server with port 4000 with http package
// const server = http.createServer(app);
// server.listen(4000,"localhost",()=> {
//     console.log("server");
// });

//crash server with port 4000 with express package
// app.listen(4000,"localhost",()=> {
//     console.log("server");
// });
