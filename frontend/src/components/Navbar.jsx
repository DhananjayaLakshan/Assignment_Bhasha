import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
        setIsOpen(false); // Ensure the mobile menu closes on logout
    };

    return (
        <nav className="fixed w-full top-0 z-50 bg-gray-900/60 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Brand/Logo Area */}
                    <div className="flex-shrink-0">
                        <Link to="/dashboard" className="text-white font-bold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            MyApp Admin
                        </Link>
                    </div>

                    {/* Desktop Menu & Actions */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-baseline space-x-2 mr-6 border-r border-white/10 pr-6">
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/create-student">Add Student</NavLink>
                            <NavLink to="/create-course">Add Course</NavLink>
                        </div>

                        {/* Desktop Logout Button */}
                        <button
                            onClick={logout}
                            className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:-translate-y-0.5"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger Icon */}
                            {isOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-900/90 backdrop-blur-xl border-b border-white/10 shadow-xl">
                    <MobileNavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
                    <MobileNavLink to="/create-student" onClick={() => setIsOpen(false)}>Add Student</MobileNavLink>
                    <MobileNavLink to="/create-course" onClick={() => setIsOpen(false)}>Add Course</MobileNavLink>

                    {/* Mobile Logout Button */}
                    <button
                        onClick={logout}
                        className="w-full text-left mt-4 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 block px-3 py-3 rounded-xl text-base font-medium transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

// Helper component for Desktop Links
const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5"
    >
        {children}
    </Link>
);

// Helper component for Mobile Links
const MobileNavLink = ({ to, children, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="text-gray-300 hover:text-white block px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:bg-white/10"
    >
        {children}
    </Link>
);