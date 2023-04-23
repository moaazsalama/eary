const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const ExamController = require('../../controller/exam_controller');
router.get('/allExams', auth, (req, res) => {
    //ensure that request body is not empty and has all required fields

    ExamController.getallExams(req, res);


});
module.exports = router;