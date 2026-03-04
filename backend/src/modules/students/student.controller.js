const mongoose = require("mongoose");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const Course = require("../courses/course.model");
const { createStudent, listStudents, getStudentById } = require("./student.service");

const createStudentController = asyncHandler(async (req, res) => {
    // Validate ObjectId
    if (!mongoose.isValidObjectId(req.body.courseId)) {
        throw new ApiError(400, "Invalid courseId");
    }

    // Ensure course exists
    const courseExists = await Course.exists({ _id: req.body.courseId });
    if (!courseExists) {
        throw new ApiError(400, "courseId does not exist");
    }

    const student = await createStudent(req.body);
    res.status(201).json({ success: true, data: student });
});

const listStudentsController = asyncHandler(async (req, res) => {
    const q = (req.query.q || "").trim();
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 50);

    const result = await listStudents({ q, page, limit });
    res.status(200).json({ success: true, data: result });
});

const getStudentByIdController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid student id");

    const student = await getStudentById(id);
    if (!student) throw new ApiError(404, "Student not found");

    res.status(200).json({ success: true, data: student });
});

module.exports = { createStudentController, listStudentsController, getStudentByIdController };