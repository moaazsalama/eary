const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();
const adminAuth=require("../middleware/admin");
const conn =require("../db/connection");
const manage_question=[];
//get all data
router.get('/manage_question',(req, res)=> {
    conn.query("SELECT * FROM  hearing_exam",(err,result,fields)=>{
        //console.log(err,result,fields);
        res.json(result);
    });
   
  });
  //save all data
  router.post('/manage_question',adminAuth, (req, res)=> {
    const data=req.body;
    conn.query("insert into hearing_exam set ?",
    {/*id:1,*/ examID:data.examID, AudioPath:data.AudioPath,questionID:data.questionID},
    (err,result,fields)=>{
        if(err)
        {
            res.statusCode=400;
            res.json({
                message:" failed save",
          });
        }
        else{
            res.json({
                message:" created done",
           });
        }
    
    });
  });
  //get special data
  router.get('/manage_question/:questionID',(req, res)=> {
    const {questionID} =req.params;
    conn.query("SELECT * FROM hearing_exam where ?",{questionID:questionID},(err,result,fields)=>{
        if( result[0])
        {
            res.json(result[0]);
        }
       else{
        res.statusCode=404;
        res.json({
            message:"not found",
        });
       }
    });
  });
  //update  data
  router.put('/manage_question/:questionID',adminAuth, (req, res)=> {
    const {questionID} =req.params;
    const data=req.body;
    conn.query("update hearing_exam set? where?",
    [{examID:data.examID, AudioPath:data.AudioPath},{questionID:questionID}],
    (err,result)=>{
        if(err)
        {
            res.statusCode=500;
            res.json({message:"faild update"});
        }
        res.json("updated done");
    });
  });
  //delete  data
  router.delete('/manage_question/:questionID',adminAuth, (req, res)=> {
    const {questionID} =req.params;
    conn.query("delete from hearing_exam where?",{questionID:questionID},(err,result)=>{
        if(err){
            res.statusCode=500
            res.json({
                message:"failed to delete",
            });
        }
        res.json({
            "message":"deleted done",
        });
    });

  });
  module.exports = router;