const router = require("express").Router();
const validate = require("../../middleware/validate");
const { loginSchema } = require("./auth.validators");
const { loginController } = require("./auth.controller");

router.post("/login", validate(loginSchema), loginController);

module.exports = router;