/*jshint esversion: 8*/

const Joi = require('@hapi/joi');
const validator = require("email-validator");


//CREATING A VALIDATION FUNCTION FOR USER REGISTRATION DATA
const registerValidation = data => {

    const userValidationSchema = Joi.object({
        name: Joi.string()
            .min(1)
            .required(),
        email: Joi.string()
            .min(4)
            .required()
            .email(),
        password: Joi.string()
            .min(4)
            .required()
    });

    return userValidationSchema.validate(data);
};

//asdfasdfasdf
const loginValidation = data => {

    const loginValidationSchema = Joi.object({
        email: Joi.string()
            .min(4)
            .required()
            .email(),
        password: Joi.string()
            .min(4)
            .required()
    });

    console.log(`In val body.email = ${data.email}`);
    console.log(`In val body.password = ${data.password}`);

    return loginValidationSchema.validate(data);

};

//asdfasdfasdf
const loginValidation1 = data => {


    console.log(`In val new data.email = ${data.email}`);
    console.log(`In val new data.password = ${data.password}`);

    console.log("check = " + validator.validate(data.email));
    return validator.validate(data.email);

};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;