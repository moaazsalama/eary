const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const QuestionController = require('../../controller/question_controller');
router.get('/question/:ID', auth, (req, res) => {
    // const {ID} =req.params;
    QuestionController.getQuestion(req, res);

});
module.exports = router;