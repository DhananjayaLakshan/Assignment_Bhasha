import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const res = await api.get(`/students?q=${search}`);
            setStudents(res.data.data.items || res.data.data); // Fallback depending on your API structure
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle search on form submit (allows pressing Enter)
    const handleSearch = (e) => {
        e.preventDefault();
        fetchStudents();
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-5rem)] mt-10">

            {/* Header & Search Bar Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Students Dashboard
                </h1>

                <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
                    <input
                        className="w-full md:w-64 bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        placeholder="Search students..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold py-2 px-6 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 disabled:opacity-50"
                    >
                        {isLoading ? "..." : "Search"}
                    </button>
                </form>
            </div>

            {/* Glassmorphism Table Container */}
            <div className="bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">

                {/* Responsive Scroll Wrapper */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">

                        <thead className="bg-black/40 text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium">Contact</th>
                                <th className="px-6 py-4 font-medium">Course</th>
                                <th className="px-6 py-4 font-medium">Department</th>
                                <th className="px-6 py-4 font-medium text-right">Fee</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        Loading students...
                                    </td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No students found.
                                    </td>
                                </tr>
                            ) : (
                                students.map((s) => (
                                    <tr
                                        key={s._id}
                                        className="hover:bg-white/5 transition-colors duration-200 group"
                                    >
                                        <td className="px-6 py-4 font-medium text-white">
                                            {s.firstName} {s.lastName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {s.contactNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-md text-xs">
                                                {s.courseId?.name || "Unassigned"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {s.courseId?.department || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-green-400">
                                            {s.courseId?.fee ? `$${s.courseId.fee}` : "N/A"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
}