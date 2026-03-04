const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const auth = (req, _res, next) => {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
        return next(new ApiError(401, "Missing or invalid Authorization header"));
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // { sub, username, role }
        next();
    } catch (err) {
        return next(new ApiError(401, "Invalid or expired token"));
    }
};

module.exports = auth;