const asyncHandler = require("../../utils/asyncHandler");
const { login } = require("./auth.service");

const loginController = asyncHandler(async (req, res) => {
    const result = await login(req.body);
    res.status(200).json({ success: true, data: result });
});

module.exports = { loginController };