const Joi = require("joi");

const createCourseSchema = Joi.object({
    name: Joi.string().trim().min(2).max(120).required(),
    department: Joi.string()
        .valid("Engineering", "Business Management", "English", "Hospitality", "Health")
        .required(),
    fee: Joi.number().min(0).required(),
});

module.exports = { createCourseSchema };