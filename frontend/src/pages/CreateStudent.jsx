import { useEffect, useState } from "react";
import api from "../api/api";

export default function CreateStudent() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        address: "",
        contactNumber: "",
        courseId: ""
    });

    // Added state for better UX
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const fetchCourses = async () => {
        try {
            const res = await api.get("/courses");
            setCourses(res.data.data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

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
            await api.post("/students", form);
            setMessage({ type: "success", text: "Student created successfully!" });

            // Reset form
            setForm({
                firstName: "",
                lastName: "",
                birthday: "",
                address: "",
                contactNumber: "",
                courseId: ""
            });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: "error", text: "Failed to create student. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Shared input classes for consistency
    const inputClasses = "w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-1 ml-1";

    return (
        <div className="flex justify-center items-center p-4 mt-10 min-h-[calc(100vh-5rem)]">

            {/* Glassmorphism Card Container */}
            <div className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

                <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Add New Student
                </h1>

                {/* Inline Status Message */}
                {message && (
                    <div className={`mb-6 p-3 rounded-lg border text-sm text-center transition-all ${message.type === "success"
                        ? "bg-green-500/20 border-green-500/50 text-green-200"
                        : "bg-red-500/20 border-red-500/50 text-red-200"
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Name Grid: 1 column on mobile, 2 on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClasses}>First Name</label>
                            <input
                                required
                                name="firstName"
                                placeholder="e.g. Jane"
                                className={inputClasses}
                                value={form.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Last Name</label>
                            <input
                                required
                                name="lastName"
                                placeholder="e.g. Doe"
                                className={inputClasses}
                                value={form.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClasses}>Birthday</label>
                            <input
                                required
                                name="birthday"
                                type="date"
                                // [color-scheme:dark] forces the browser's calendar icon to look good on a dark background
                                className={`${inputClasses} [color-scheme:dark]`}
                                value={form.birthday}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Contact Number</label>
                            <input
                                required
                                name="contactNumber"
                                placeholder="e.g. (555) 123-4567"
                                className={inputClasses}
                                value={form.contactNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Address</label>
                        <input
                            required
                            name="address"
                            placeholder="Full Street Address"
                            className={inputClasses}
                            value={form.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Assign Course</label>
                        <select
                            required
                            name="courseId"
                            className={`${inputClasses} appearance-none`}
                            value={form.courseId}
                            onChange={handleChange}
                        >
                            <option value="" className="bg-gray-800 text-gray-400">Select Course</option>
                            {courses.map((c) => (
                                <option key={c._id} value={c._id} className="bg-gray-800">
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {isSubmitting ? "Saving Student..." : "Create Student"}
                    </button>

                </form>
            </div>
        </div>
    );
}