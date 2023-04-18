
const utils = require('util');
// const path = require('path');
const answerModel = require('../model/answer_model');
const { json } = require('body-parser');
const Joi = require('joi');
const { join } = require('path');

// const question_model = require('../model/question_model');
class AnswerController {
    async addAnswer(req, res) {
        const { question } = req.body;
        const data = req.body;
        const { error } = validateAnswer(data);
        console.log(error);
        if (error) {
            //generate List of errors in an array

            const errors = error.details.map((err) => err.message.replace(/"/g, ''));
            res.statusCode = 400;
            res.json({
                error_message: errors,
            });
        } else {
            //ensure that question exists
            const questionID = data.questionID;
            const answer = data.answer;
            const validAnswer = data.validAnswer;

            // const filePath = path.join('uploads', audioFile.path);
            try {
                const result = await answerModel.addAnswer(questionID, answer, validAnswer);
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

    }
    async getQuestion(req, res) {
        const { ID } = req.params;
        try {
            const result = await answerModel.getQuestion(ID);
            //reformat the result change the validAnswer to boolean value
            // and id to answer_id and q_id to question_id for all answers

            const answers = result.map((item) => {
                const { id, q_id, content, validAnswer } = item;
                return {
                    answer_id: id,
                    question_id: q_id,
                    answer: content,
                    validAnswer: validAnswer === 1 ? true : false,
                };
            });

            console.log(result);
            res.status(200).json({
                message: 'Question fetched successfully',
                data: answers,
                // file: item
                // file: file
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Question Did not fetch', error: error });
        }
    }
    // async deleteQuestion(req, res) {
    //     const { ID } = req.params;
    //     try {
    //         const result = await answerModel.deleteQuestion(ID);
    //         res.status(200).json({
    //             message: 'Question deleted successfully',
    //             data: result
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'Question Did not delete', error: error });
    //     }
    // }
    // async updateQuestion(req, res) {
    //     const  ID  = req.params;
    //     var  question  = req.body;
    //     console.log(question);
    //     // const audioFile = req.file;
    //     try {
    //         //serlize the data
    //         // question = JSON.stringify(question);
    //         console.log(ID);
    //         const result = await answerModel.updateQuestion(ID['ID'], question);
    //         res.status(200).json({
    //             message: 'Question updated successfully',
    //             data: result
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'Question Did not update', error: error });
    //     }
    // }
    // async deleteQuestion(req, res) {
    //     const { ID } = req.params;
    //     try {
    //         const result = await answerModel.deleteQuestion(ID);
    //         res.status(200).json({
    //             message: 'Question deleted successfully',
    //             // data: result
    //             satuts:200

    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'Question Did not delete', error: error });
    //     }
    // }
}

//function to validate request body
function validateAnswer(answer) {
    const schema = Joi.object({
        questionID: Joi.number().required(),
        answer: Joi.string().required(),

        validAnswer: Joi.number().required()
    });


    return schema.validate(answer, { abortEarly: false });

}

module.exports = new AnswerController;