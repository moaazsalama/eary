const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/admin');

const AnswerController = require('../../controller/answer_controller');
router.post('/answer', adminAuth, auth, (req, res) => {
    //ensure that request body is not empty and has all required fields

    AnswerController.addAnswer(req, res);


});
module.exports = router;