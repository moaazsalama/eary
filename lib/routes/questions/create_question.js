const express = require('express');
const router = express.Router();
// const adminAuth = require("../middleware/admin");
// multi/part form data
// parse application/json

// router.post('/question', auths, multer().single('audio') ,(req, res) => {
//     const { question } = req.body;
//     const audioFile = req.file;
//     const recorder = new Record();
//     const outputStream = recorder.record({
//       sampleRate: 16000,
//       channels: 1,
//       verbose: true,
//       silence: '5.0',
//     });
//     audioFile.stream.pipe(outputStream);
// });
const multer = require('multer');


// Set up middleware
// app.use(bodyParser.json());
// Define multer middleware


// Set up MySQL connection


// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-audio.wav`);
    },
});

// Define file filter for uploaded files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
};

const upload = multer({ storage, fileFilter });
// Define route
const QuestionController = require('../../controller/question_controller');
router.post('/questions', upload.single('audio'), (req, res) => {
    QuestionController.createExam(req, res);

});

// app.listen(4000, () => {
//   console.log('Server started on port 3000');
// });
module.exports = router;
