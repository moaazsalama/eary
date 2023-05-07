const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/admin');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-audio.wav`);
    },
});
const fileFilter = (req, file, cb) => {
    //validate file is audio and not more than 5MB

    if (file.mimetype.startsWith('audio/') == false) {

        cb(new Error('File should be audio'), false);
    }
    if (file.size > 5000000) {
        cb(new Error('File should be lower than 5 MB'), false);
    }
    cb(null, true);

};

const upload = multer({ storage, fileFilter });
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const QuestionController = require('../../controller/question_controller');
router.post('/questions', auth, adminAuth, upload.single('audio'), (req, res) => {




    QuestionController.createQuestion(req, res);

});

module.exports = router;
