import { useState } from "react";
import api from "../api/api";

export default function CreateCourse() {
    const [form, setForm] = useState({
        name: "",
        department: "",
        fee: ""
    });

    // Added state for better UX
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            await api.post("/courses", form);
            setMessage({ type: "success", text: "Course created successfully!" });
            setForm({ name: "", department: "", fee: "" });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: "error", text: "Failed to create course. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center p-4 min-h-[calc(100vh-5rem)]">
            {/* Glassmorphism Card Container */}
            <div className="w-full max-w-lg bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

                <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Create Course
                </h1>

                {/* Inline Success/Error Message instead of alert() */}
                {message && (
                    <div className={`mb-6 p-3 rounded-lg border text-sm text-center transition-all ${message.type === "success"
                            ? "bg-green-500/20 border-green-500/50 text-green-200"
                            : "bg-red-500/20 border-red-500/50 text-red-200"
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Course Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">Course Name</label>
                        <input
                            required
                            name="name"
                            placeholder="e.g. Advanced React Patterns"
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Department Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">Department</label>
                        <select
                            required
                            name="department"
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all appearance-none"
                            value={form.department}
                            onChange={handleChange}
                        >
                            {/* Note: Options have dark backgrounds so they are readable when the dropdown opens */}
                            <option value="" className="bg-gray-800 text-gray-400">Select Department</option>
                            <option value="Engineering" className="bg-gray-800">Engineering</option>
                            <option value="Business Management" className="bg-gray-800">Business Management</option>
                            <option value="English" className="bg-gray-800">English</option>
                            <option value="Hospitality" className="bg-gray-800">Hospitality</option>
                            <option value="Health" className="bg-gray-800">Health</option>
                        </select>
                    </div>

                    {/* Course Fee Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">Course Fee ($)</label>
                        <input
                            required
                            name="fee"
                            type="number"
                            min="0"
                            placeholder="e.g. 1500"
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                            value={form.fee}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {isSubmitting ? "Creating..." : "Create Course"}
                    </button>

                </form>
            </div>
        </div>
    );
}