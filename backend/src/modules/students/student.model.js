const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true, maxlength: 80 },
        lastName: { type: String, required: true, trim: true, maxlength: 80 },
        birthday: { type: Date, required: true },
        address: { type: String, required: true, trim: true, maxlength: 250 },
        contactNumber: { type: String, required: true, trim: true, maxlength: 30 },
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    },
    { timestamps: true }
);

studentSchema.index({ firstName: 1, lastName: 1 });
studentSchema.index({ contactNumber: 1 });

module.exports = mongoose.model("Student", studentSchema);