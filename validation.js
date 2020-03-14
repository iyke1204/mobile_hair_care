//Validation
const Joi = require('@hapi/joi');

//Signup Validation
const signupValidation = (data) => {
    const joiSchema = Joi.object({
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
        password_confirm: Joi.string().min(8).required()
    })
   return joiSchema.validate(data);
}

const loginValidation = (data) => {
    const joiSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    })
   return joiSchema.validate(data);
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;