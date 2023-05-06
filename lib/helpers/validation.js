const Joi = require('joi');
class Validation {
   static validateExam(exam) {
        const schema = Joi.object({
            "answers": Joi.array().items(Joi.object({
                "questionID": Joi.number().required(),
                "answer": Joi.number().required()
            })).required(),

        });
        return schema.validate(exam);
    }
    static validateAnswer(answer) {
        const schema = Joi.object({
            questionID: Joi.number().required(),
            answer: Joi.string().required(),
    
            validAnswer: Joi.boolean().required()
        });
    
    
        return schema.validate(answer, { abortEarly: false });
    
    }
    static  valideQuestion(data) {
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
    static validateUpdateUser(body) {
        //validation schema
        const schema = Joi.object({
            full_name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            phone: Joi.string().optional(),
            password: Joi.string().optional(),
            status: Joi.number().optional(),
        });

        return schema.validate(body);
        //return result of validation or error 
        //handel error in controller
        


    }
}
module.exports = Validation;