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

    const [errors, setErrors] = useState({});
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

        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    // Validation
    const validateForm = () => {

        const newErrors = {};

        if (!form.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!form.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!form.birthday) {
            newErrors.birthday = "Birthday is required";
        }

        if (!form.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!form.contactNumber.trim()) {
            newErrors.contactNumber = "Contact number is required";
        } else if (!/^[0-9]{10,15}$/.test(form.contactNumber)) {
            newErrors.contactNumber = "Enter a valid phone number";
        }

        if (!form.courseId) {
            newErrors.courseId = "Please select a course";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setMessage(null);

        try {

            await api.post("/students", form);

            setMessage({
                type: "success",
                text: "Student created successfully!"
            });

            setForm({
                firstName: "",
                lastName: "",
                birthday: "",
                address: "",
                contactNumber: "",
                courseId: ""
            });

            setTimeout(() => setMessage(null), 3000);

        } catch (error) {

            setMessage({
                type: "error",
                text: error.response?.data?.message || "Failed to create student"
            });

        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses =
        "w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50";

    const labelClasses = "block text-sm font-medium text-gray-300 mb-1 ml-1";

    const errorText = "text-red-400 text-sm mt-1";

    return (
        <div className="flex justify-center items-center p-4 mt-10 min-h-[calc(100vh-5rem)]">

            <div className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

                <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Add New Student
                </h1>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div>
                            <label className={labelClasses}>First Name</label>
                            <input
                                name="firstName"
                                className={inputClasses}
                                value={form.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && (
                                <p className={errorText}>{errors.firstName}</p>
                            )}
                        </div>

                        <div>
                            <label className={labelClasses}>Last Name</label>
                            <input
                                name="lastName"
                                className={inputClasses}
                                value={form.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && (
                                <p className={errorText}>{errors.lastName}</p>
                            )}
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div>
                            <label className={labelClasses}>Birthday</label>
                            <input
                                type="date"
                                name="birthday"
                                className={`${inputClasses} [color-scheme:dark]`}
                                value={form.birthday}
                                onChange={handleChange}
                            />
                            {errors.birthday && (
                                <p className={errorText}>{errors.birthday}</p>
                            )}
                        </div>

                        <div>
                            <label className={labelClasses}>Contact Number</label>
                            <input
                                name="contactNumber"
                                placeholder="0771234567"
                                className={inputClasses}
                                value={form.contactNumber}
                                onChange={handleChange}
                            />
                            {errors.contactNumber && (
                                <p className={errorText}>{errors.contactNumber}</p>
                            )}
                        </div>

                    </div>

                    <div>
                        <label className={labelClasses}>Address</label>
                        <input
                            name="address"
                            className={inputClasses}
                            value={form.address}
                            onChange={handleChange}
                        />
                        {errors.address && (
                            <p className={errorText}>{errors.address}</p>
                        )}
                    </div>

                    <div>
                        <label className={labelClasses}>Assign Course</label>
                        <select
                            name="courseId"
                            className={`${inputClasses} appearance-none`}
                            value={form.courseId}
                            onChange={handleChange}
                        >
                            <option value="" className="bg-gray-800">
                                Select Course
                            </option>

                            {courses.map((c) => (
                                <option
                                    key={c._id}
                                    value={c._id}
                                    className="bg-gray-800"
                                >
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        {errors.courseId && (
                            <p className={errorText}>{errors.courseId}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving Student..." : "Create Student"}
                    </button>

                </form>
            </div>
        </div>
    );
}