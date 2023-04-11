
const utils = require('util');
// const path = require('path');
const questionModel = require('../model/question_model');
const { json } = require('body-parser');
const fs = require('fs');
// const question_model = require('../model/question_model');
class QuestionController {
    async createExam(req, res) {
        const { question } = req.body;
        const audioFile = req.file;

        // const filePath = path.join('uploads', audioFile.path);
        try {
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
        const file=   await utils.promisify(fs.readFile).bind(fs)(('uploads/1681199029068-audio.wav'));
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
        const  ID  = req.params;
        var  question  = req.body;
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
}
module.exports = new QuestionController;