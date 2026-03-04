const asyncHandler = require("../../utils/asyncHandler");
const { createCourse, listCourses } = require("./course.service");

const createCourseController = asyncHandler(async (req, res) => {
    const course = await createCourse(req.body);
    res.status(201).json({ success: true, data: course });
});

const listCoursesController = asyncHandler(async (_req, res) => {
    const courses = await listCourses();
    res.status(200).json({ success: true, data: courses });
});

module.exports = { createCourseController, listCoursesController };