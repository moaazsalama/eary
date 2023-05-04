const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app=express();
// Define route
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
const QuestionController = require('../../controller/question_controller');
router.put('/question/:ID',auth, adminAuth, upload.single('audio'),(req, res) => {
    // console.log(req.body);
    QuestionController.updateQuestion(req, res);

});//

// app.listen(4000, () => {
//   console.log('Server started on port 3000');
// });
module.exports = router;
