const Course = require("./course.model");

const createCourse = async (payload) => {
    const course = await Course.create(payload);
    return course;
};

const listCourses = async () => {
    return Course.find().sort({ createdAt: -1 }).lean();
};

module.exports = { createCourse, listCourses };