const Exam = require('../model/exam');
const Joi = require('joi');
// const Question = require('../model/question');
// const quest= require('../model/question_model');
const answer_model = require('../model/answer_model');
const question_model = require('../model/question_model');
class ExamController {
    // ...
    constructor() {
        this.examModel = Exam;
        this.answerModel=answer_model;
        this.questionModel = question_model;
    }
    async getExam(req, res) {

        const ID = req.params.id;
        // if (this.validateExam(req.body).error) 
        // return res.status(400).send(this.validateExam(req.body).error.details[0].message);
        // else {
        const exam = await this.examModel.findByPk(req.params.id);
        if (!exam) return res.status(404).send('The exam with the given ID was not found.');

        res.json(exam);
        // }
    }
    async takeExam(req, res) {
        if (this.validateExam(req.body).error) {
            return res.status(400).send(this.validateExam(req.body).error.details[0].message);
        }
        else {
            // const exam = await Exam.findByPk(req.params.id);
            // if (!exam) return res.status(404).send('The exam with the given ID was not found.');
            const userAnswers = req.body.answers;
            const answersList = await this.answerModel.getAllAnswers();
            

            let score = 0;
            let answersWithTrueAnswer = [];
            for (let i = 0; i < userAnswers.length; i++) {
                const answer = userAnswers[i];
                const question = await answersList.find(q => q.id == answer.answer);
                console.log(question);
                console.log(answer);
                console.log(answersList);


                 const q=  await question_model.getQuestion(question.q_id);
                const item= q[0];
                if (question.isTrue==1) {
                    score += item.score;

                }

                let quest = question;
                quest.trueAnswer = question.answerId;
                quest.score = item.score;
                answersWithTrueAnswer.push(question);
            }
            //get current dateTime 
            const date = new Date();
            console.log(date);
            console.log(req.userId);
            console.log(score);
            let result = this.examModel .create({
                total_score: score,
                user_id: req.userId,
                date: date,


            });
            if (!result) return res.status(500).send('Something went wrong');


            res.json({result:result, score: score, review: answersWithTrueAnswer });
        }
    }
    async getallExams(req, res) {
        const exams = await this.examModel .findAll(
            {
                where: {
                    user_id: req.userId
                }
            }
        );
        res.json(exams);
    }

    validateExam(exam) {
        const schema = Joi.object({
            "answers": Joi.array().items(Joi.object({
                "questionID": Joi.number().required(),
                "answer": Joi.number().required()
            })).required(),

        });
        return schema.validate(exam);
    }
    // ...
}
module.exports =new ExamController();