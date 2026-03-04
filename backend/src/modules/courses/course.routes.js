const router = require("express").Router();
const auth = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const { createCourseSchema } = require("./course.validators");
const { createCourseController, listCoursesController } = require("./course.controller");

router.get("/", auth, listCoursesController);
router.post("/", auth, validate(createCourseSchema), createCourseController);

module.exports = router;