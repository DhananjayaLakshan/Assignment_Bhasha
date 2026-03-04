const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/ApiError");
const User = require("./user.model");

const login = async ({ username, password }) => {
    const user = await User.findOne({ username }).lean();
    if (!user) throw new ApiError(401, "Invalid username or password");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new ApiError(401, "Invalid username or password");

    const token = jwt.sign(
        { sub: user._id.toString(), username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    return {
        token,
        user: { id: user._id.toString(), username: user.username, role: user.role },
    };
};

module.exports = { login };