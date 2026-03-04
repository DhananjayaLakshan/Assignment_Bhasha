import { useState } from "react";
import api from "../api/api";

export default function CreateCourse() {

    const [form, setForm] = useState({
        name: "",
        department: "",
        fee: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        // Clear error when user edits field
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    // Frontend validation
    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Course name is required";
        }

        if (!form.department) {
            newErrors.department = "Department is required";
        }

        if (form.fee === "" || Number(form.fee) < 0) {
            newErrors.fee = "Fee must be a positive number";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {

            await api.post("/courses", {
                ...form,
                fee: Number(form.fee)
            });

            setMessage({
                type: "success",
                text: "Course created successfully!"
            });

            setForm({
                name: "",
                department: "",
                fee: ""
            });

            setTimeout(() => setMessage(null), 3000);

        } catch (error) {

            setMessage({
                type: "error",
                text: error.response?.data?.message || "Failed to create course"
            });

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center p-4 min-h-[calc(100vh-5rem)]">

            <div className="w-full max-w-lg bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

                <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Create Course
                </h1>

                {/* Success / Error Message */}
                {message && (
                    <div
                        className={`mb-6 p-3 rounded-lg border text-sm text-center ${message.type === "success"
                                ? "bg-green-500/20 border-green-500/50 text-green-200"
                                : "bg-red-500/20 border-red-500/50 text-red-200"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Course Name */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1 ml-1">
                            Course Name
                        </label>

                        <input
                            name="name"
                            placeholder="e.g. Advanced React"
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50"
                            value={form.name}
                            onChange={handleChange}
                        />

                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1 ml-1">
                            Department
                        </label>

                        <select
                            name="department"
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50"
                            value={form.department}
                            onChange={handleChange}
                        >
                            <option value="" className="bg-gray-800">
                                Select Department
                            </option>

                            <option value="Engineering" className="bg-gray-800">
                                Engineering
                            </option>

                            <option value="Business Management" className="bg-gray-800">
                                Business Management
                            </option>

                            <option value="English" className="bg-gray-800">
                                English
                            </option>

                            <option value="Hospitality" className="bg-gray-800">
                                Hospitality
                            </option>

                            <option value="Health" className="bg-gray-800">
                                Health
                            </option>
                        </select>

                        {errors.department && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.department}
                            </p>
                        )}
                    </div>

                    {/* Fee */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1 ml-1">
                            Course Fee ($)
                        </label>

                        <input
                            name="fee"
                            type="number"
                            min="0"
                            placeholder="e.g. 1500"
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50"
                            value={form.fee}
                            onChange={handleChange}
                        />

                        {errors.fee && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.fee}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? "Creating..." : "Create Course"}
                    </button>

                </form>
            </div>
        </div>
    );
}