import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateStudent from "./pages/CreateStudent";
import CreateCourse from "./pages/CreateCourse";
import Navbar from "./components/Navbar";

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      {token && <Navbar />}

      <div className="p-6">

        <Routes>

          <Route
            path="/"
            element={!token ? <Login /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/" />}
          />

          <Route
            path="/create-student"
            element={token ? <CreateStudent /> : <Navigate to="/" />}
          />

          <Route
            path="/create-course"
            element={token ? <CreateCourse /> : <Navigate to="/" />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;