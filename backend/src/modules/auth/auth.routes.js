const router = require("express").Router();
const validate = require("../../middleware/validate");
const { loginSchema } = require("./auth.validators");
const { loginController } = require("./auth.controller");

router.post("/login", validate(loginSchema), loginController);
router.post("/logout", (req, res) => {
    res.json({
        success: true,
        message: "Logged out"
    });
});

module.exports = router;