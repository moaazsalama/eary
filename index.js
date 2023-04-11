const express = require('express');
const bodyParser = require('body-parser');
const eary = require('./lib/routes/eary');
const login = require('./lib/routes/auth/login');
const update = require('./lib/routes/update');
const manage_question = require('./lib/routes/manage_question');
const answer = require('./lib/routes/answer');
const showdegree = require('./lib/routes/showdegree');
const register = require('./lib/routes/auth/register');
// const create_exam=require('./lib/routes/createExam');
const MUserAccounts = require('./lib/routes/MUserAccounts');
const question = require('./lib/routes/questions/create_question');
const getQuestion = require('./lib/routes/questions/get_question');
const updateQuestion = require('./lib/routes/questions/update_question');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//for import eary route
app.use("", eary, login, update, manage_question, question, getQuestion,updateQuestion, answer, showdegree, register, MUserAccounts);
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
