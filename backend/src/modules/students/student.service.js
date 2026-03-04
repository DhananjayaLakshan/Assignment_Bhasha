const Student = require("./student.model");

const createStudent = async (payload) => {
    const doc = await Student.create(payload);
    return doc;
};

const listStudents = async ({ q, page, limit }) => {
    const filter = {};

    if (q) {
        const re = new RegExp(q, "i");
        filter.$or = [{ firstName: re }, { lastName: re }, { contactNumber: re }];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        Student.find(filter)
            .populate("courseId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Student.countDocuments(filter),
    ]);

    return {
        items,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
    };
};

const getStudentById = async (id) => {
    return Student.findById(id).populate("courseId").lean();
};

module.exports = { createStudent, listStudents, getStudentById };