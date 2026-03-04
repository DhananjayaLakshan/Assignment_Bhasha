const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 120 },
        department: {
            type: String,
            required: true,
            enum: ["Engineering", "Business Management", "English", "Hospitality", "Health"],
        },
        fee: { type: Number, required: true, min: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);