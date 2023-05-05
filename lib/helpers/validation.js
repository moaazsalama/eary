const Joi = require('joi');
class AuthValidation {
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
module.exports = AuthValidation;