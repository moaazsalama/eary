
const utils = require('util');
// const path = require('path');
const questionModel = require('../model/question_model');
const fs = require('fs');
const joi = require('joi');
const answer_model = require('../model/answer_model');
const Validation = require('../helpers/validation');
const Response = require('../helpers/response');
// const question_model = require('../model/question_model');
class QuestionController {
    constructor() {
        this.questionModel = questionModel;
        this.answerModel = answer_model;
    }

    async createQuestion(req, res) {
        const question = req.body;
        const audioFile = req.file;

        try {
            //validate the request body
            const { error } = Validation.valideQuestion(question);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            //
            const result = await this.questionModel.addQuestion(question, audioFile.path);
            // console.log(JSON.stringify(result));
            return Response.success(res, result['insertId'], 'Question saved successfully', 200);
        } catch (error) {
            return Response.error(res, error.message, 500);
        }

    }
    async getQuestion(req, res) {
        const { ID } = req.params;
        try {
            const result = await this.questionModel.getQuestion(ID);

            const file = await utils.promisify(fs.readFile).bind(fs)((result[0].audio_path));

            const item = Buffer.from(file).toString('base64');
            result[0].audioFile = item;
            return res.status(200).json({
                message: 'Question fetched successfully',
                data: result[0],
                file: item
                // file: file
            });
        } catch (error) {
            // console.log(error);
            return res.status(500).json({ message: 'Question Did not fetch', error: error });
        }
    }
    async deleteQuestion(req, res) {
        const { ID } = req.params;
        try {
            const result = await this.questionModel.deleteQuestion(ID);
            return Response.success(res, result, 'Question deleted successfully', 200);
        } catch (error) {
            console.log(error);
            return Response.error(res, error.message, 500);
        }
    }
    async updateQuestion(req, res) {
        const ID = req.params;
        var question = req.body;
        const audioFile = req.file;
        question.audio_path = audioFile.path;
        console.log(question);
        // const audioFile = req.file;
        try {

            console.log(ID);
            const result = await this.questionModel.updateQuestion(ID['ID'], question);
            return Response.success(res, result, 'Question updated successfully', 200);
        } catch (error) {
            console.log(error);
            return Response.error(res, error.message, 500);
        }
    }
    async getAllQuestion(req, res) {
        try {
            let result = await this.questionModel.getAllQuestions();
            let answers = await this.answerModel.getAllAnswers();
            //add the answers to the question
            result = this.addAnswersToQuestions(result, answers);
            //make the audio file to base64
            await this.addAudioToPayLoad(result);
            return Response.success(res, result, 'Question fetched successfully', 200);
        } catch (error) {

            console.log(error);
            return Response.error(res, error.message, 500);
        }
    }
    async addAudioToPayLoad(result) {

        for (let i = 0; i < result.length; i++) {
            // fs.readFile(result[i].audio_path);
            const file = await utils.promisify(fs.readFile).bind(fs)((result[i].audio_path));
            // const file = await utils.promisify(fs.readFileSync).bind(fs)(filePath);
            //coverting the file to base64
            const item = Buffer.from(file).toString('base64');
            result[i].audioFile = item;
        }
    }

    addAnswersToQuestions(result, answers) {
        for (let i = 0; i < result.length; i++) {
            result[i].answers = [];
            for (let j = 0; j < answers.length; j++) {
                if (result[i].q_id == answers[j].q_id) {
                    result[i].answers.push(answers[j]);
                }
            }
        }
        return result;
    }
}

module.exports = new QuestionController();


