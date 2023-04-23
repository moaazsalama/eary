
const utils = require('util');
// const path = require('path');
const questionModel = require('../model/question_model');
const { json } = require('body-parser');
const fs = require('fs');
const joi = require('joi');
const answer_controller = require('./answer_controller');
const answer_model = require('../model/answer_model');
// const question_model = require('../model/question_model');
class QuestionController {
    valideQuestion(data) {
        const schema = joi.object({
            content: joi.string().required(),
            // audio: 
            score: joi.number().required(),
            answers: joi.array().items(joi.object({
                content: joi.string().required(),
                validAnswer: joi.boolean().required()
            })).optional()
        });
        return schema.validate(data);
    }
    async createExam(req, res) {
        const question = req.body;
        const audioFile = req.file;

        // const filePath = path.join('uploads', audioFile.path);
        try {
            //validate the request body
            const { error } = this.valideQuestion(question);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            console.log(question);
            //
            const result = await questionModel.addQuestion(question, audioFile.path);
            // console.log(JSON.stringify(result));
            console.log(result);
            res.status(200).json({
                message: 'Question saved successfully',
                data: result['insertId']

            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Question Did not save', error: error });
        }

    }
    async getQuestion(req, res) {
        const { ID } = req.params;
        try {
            const result = await questionModel.getQuestion(ID);
            //get the file path
            // const filePath = result[0].audioFile;
            //send the file
            const file = await utils.promisify(fs.readFile).bind(fs)((result[0].audio_path));
            // const file = await utils.promisify(fs.readFileSync).bind(fs)(filePath);
            //coverting the file to base64
            const item = Buffer.from(file).toString('base64');
            result[0].audioFile = item;
            // res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
            res.status(200).json({
                message: 'Question fetched successfully',
                data: result[0],
                file: item
                // file: file
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Question Did not fetch', error: error });
        }
    }
    async deleteQuestion(req, res) {
        const { ID } = req.params;
        try {
            const result = await questionModel.deleteQuestion(ID);
            res.status(200).json({
                message: 'Question deleted successfully',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Question Did not delete', error: error });
        }
    }
    async updateQuestion(req, res) {
        const ID = req.params;
        var question = req.body;
        console.log(question);
        // const audioFile = req.file;
        try {
            //serlize the data
            // question = JSON.stringify(question);
            console.log(ID);
            const result = await questionModel.updateQuestion(ID['ID'], question);
            res.status(200).json({
                message: 'Question updated successfully',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Question Did not update', error: error });
        }
    }
    async getAllQuestion(req, res) {
        try {
            let result = await questionModel.getAllQuestions();
            let answers = await answer_model.getAllAnswers();
            //add the answers to the question
            for (let i = 0; i < result.length; i++) {
                result[i].answers = [];
                for (let j = 0; j < answers.length; j++) {
                    if (result[i].q_id == answers[j].q_id) {
                        result[i].answers.push(answers[j]);
                    }
                }
            }
            //make the audio file to base64
            for (let i = 0; i < result.length; i++) {
                const file = await utils.promisify(fs.readFile).bind(fs)((result[i].audio_path	));
                // const file = await utils.promisify(fs.readFileSync).bind(fs)(filePath);
                //coverting the file to base64
                const item = Buffer.from(file).toString('base64');
                result[i].audioFile = item;
            }

            res.status(200).json({
                message: 'Question fetched successfully',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Question Did not fetch', error: error });
        }
    }
}

module.exports = new QuestionController;