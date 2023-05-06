
const Response = require('../helpers/response');
const Validation = require('../helpers/validation');
const answerModel = require('../model/answer_model');
const Joi = require('joi');

class AnswerController {
    constructor() {
        this.model = answerModel
    }
    async addAnswer(req, res) {
        const { question } = req.body;
        const data = req.body;
        const { error } = Validation.validateAnswer(data);
        console.log(error);
        if (error) {
            //generate List of errors in an array

            const errors = error.details.map((err) => err.message.replace(/"/g, ''));
            return Response.error(res, errors, 400);
        } else {
            //ensure that question exists
            const questionID = data.questionID;
            const answer = data.answer;
            const validAnswer = data.validAnswer;

            // const filePath = path.join('uploads', audioFile.path);
            try {
                //check if the is  answer for the question and if it is valid
                if (validAnswer == true || validAnswer == 1) {
                    let answers = await answerModel.getAnswer(questionID);
                    //search for the answer in the array of answers and check if it is valid
                    const answerFound = answers.find((item) => item.isTrue === 1);
                    if (answerFound) {
                        return Response.error(res, "There is already a valid answer for this question " + questionID + " and it is " + answerFound.id, 400);


                    }

                }
                const result = await answerModel.addAnswer(questionID, answer, validAnswer);
                // console.log(JSON.stringify(result));
                console.log(result);
                return Response.success(res, result['insertId'], 'Question saved successfully', 200);
            } catch (error) {


                console.log(error);
                return Response.error(res, error.message, 'Question Did not save', 500);
            }
        }

    }
    async getAnswer(req, res) {
        const { ID } = req.params;
        try {
            const result = await answerModel.getAnswer(ID);
            //reformat the result change the validAnswer to boolean value
            // and id to answer_id and q_id to question_id for all answers

            const answers = this.reformatAnswer(result);

            console.log(result);
            return Response.success(res, answers, 'Question fetched successfully', 200);
        } catch (error) {
            console.log(error);
            return Response.error(res, error.message, 'Question Did not fetch', 500);
        }
    }

    reformatAnswer(result) {
        return result.map((item) => {
            const { id, q_id, content, validAnswer } = item;
            return {
                answer_id: id,
                question_id: q_id,
                answer: content,
                validAnswer: validAnswer,
            };
        });
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


module.exports = new AnswerController;