const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();
const adminAuth=require("../../middleware/admin");
const conn =require("../../db/connection");
const answer=[];
//get all data
router.get('/answer',(req, res)=> {
    conn.query("SELECT * FROM  answers",(err,result,fields)=>{
        //console.log(err,result,fields);
        res.json(result);
    });
   
  });
  //save all data
 
  //get special data

  //update  data
  router.put('/answer/:ID',adminAuth, (req, res)=> {
    const {ID} =req.params;
    const data=req.body;
    conn.query("update answers set? where?",
    [{answer1:data.answer1, answer2:data.answer2,answer3:data.answer3,answer4:data.answer4,validAnswer:data.validAnswer},{ID:ID}],
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
  router.delete('/answer/:ID',adminAuth, (req, res)=> {
    const {ID} =req.params;
    conn.query("DELETE FROM answers WHERE ?",{ID:ID},(err,result)=>{
        if(err){
            res.statusCode=500;
            res.json({
                message: "failed to delete",
            });
        }
        
        res.json({
            message:"deleted done",
        });
    });

  });
  module.exports = router;