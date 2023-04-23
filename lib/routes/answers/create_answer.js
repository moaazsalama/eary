const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/admin');
const bodyParser = require('body-parser');

const AnswerController = require('../../controller/answer_controller');
bodyParser.raw({ type: 'application/json' });


router.post('/answer', adminAuth, auth, (req, res) => {
    //ensure that request body is not empty and has all required fields

    AnswerController.addAnswer(req, res);


});
module.exports = router;