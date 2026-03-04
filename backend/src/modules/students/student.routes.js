const router = require("express").Router();
const auth = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const { createStudentSchema } = require("./student.validators");
const {
    createStudentController,
    listStudentsController,
    getStudentByIdController,
} = require("./student.controller");

router.get("/", auth, listStudentsController);
router.get("/:id", auth, getStudentByIdController);
router.post("/", auth, validate(createStudentSchema), createStudentController);

module.exports = router;