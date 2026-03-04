const Joi = require("joi");

const createStudentSchema = Joi.object({
    firstName: Joi.string().trim().min(1).max(80).required(),
    lastName: Joi.string().trim().min(1).max(80).required(),
    birthday: Joi.date().iso().required(), // frontend should send ISO string (YYYY-MM-DD)
    address: Joi.string().trim().min(2).max(250).required(),
    contactNumber: Joi.string().trim().min(7).max(30).required(),
    courseId: Joi.string().trim().required(), // validate ObjectId in controller for better errors
});

module.exports = { createStudentSchema };