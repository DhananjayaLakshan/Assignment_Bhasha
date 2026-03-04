import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Added state for better UX
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {

            const res = await api.post("/auth/login", {
                username,
                password
            });

            localStorage.setItem("token", res.data.data.token);

            // Force navigation so auth state refreshes
            window.location.href = "/dashboard";

        } catch (err) {

            const message =
                err.response?.data?.message ||
                "Invalid username or password";

            setError(message);
            setPassword("");

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] p-4">

            {/* Glassmorphism Card Container */}
            <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 text-sm">Sign in to access the Admin Dashboard</p>
                </div>

                {/* Inline Error Message */}
                {error && (
                    <div className="mb-6 p-3 rounded-lg border bg-red-500/20 border-red-500/50 text-red-200 text-sm text-center animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Username Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">Username</label>
                        <input
                            required
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">Password</label>
                        <input
                            required
                            type="password"
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {isLoading ? "Authenticating..." : "Login"}
                    </button>

                </form>
            </div>

        </div>
    );
}