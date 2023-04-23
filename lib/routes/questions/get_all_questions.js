const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const QuestionController = require('../../controller/question_controller');
router.get('/questions', auth, (req, res) => {
    // const {ID} =req.params;
    QuestionController.getAllQuestion(req, res);

});
module.exports = router;