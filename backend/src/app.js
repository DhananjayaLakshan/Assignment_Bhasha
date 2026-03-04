const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/error");

const authRoutes = require("./modules/auth/auth.routes");
const studentRoutes = require("./modules/students/student.routes");
const courseRoutes = require("./modules/courses/course.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());   // THIS IS REQUIRED

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;