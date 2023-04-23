const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const ExamController = require('../../controller/exam_controller');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.raw({ type: 'application/json' }));
router.post('/exam/take_exam', auth, (req, res) => {
    // console.log(req.userId);
    ExamController.takeExam(req, res);
    // res.send("hello "+req.userId);
}
);
module.exports = router;