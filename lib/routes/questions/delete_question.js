const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const app=express();
// Define route

const QuestionController = require('../../controller/question_controller');
router.delete('/question/:ID',(req, res) => {
    // console.log(req.body);
    QuestionController.deleteQuestion(req, res);

});//

// app.listen(4000, () => {
//   console.log('Server started on port 3000');
// });
module.exports = router;
