const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();
const adminAuth=require("../middleware/admin");
const conn =require("../db/connection");
const eary=[];
//get all data
router.get('/eary',(req, res)=> {
    conn.query("SELECT * FROM  eary",(err,result,fields)=>{
        //console.log(err,result,fields);
        res.json(result);
    });
   
  });
  //save all data
  router.post('/eary',adminAuth, (req, res)=> {
    const data=req.body;
    conn.query("insert into eary set ?",
    {/*id:1,*/ name:data.name, description:data.description},
    (err,result,fields)=>{
        if(err)
        {
            res.statusCode=400;
            res.json({
                message:" failed save"
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
  router.get('/eary/:id',(req, res)=> {
    const {id} =req.params;
    conn.query("select * from eary where ?",{id:id},(err,result,fields)=>{
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
  router.put('/eary/:id',adminAuth, (req, res)=> {
    const {id} =req.params;
    const data=req.body;
    conn.query("update eary set? where?",
    [{name:data.name,description:data.description},{id:id}],
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
  router.delete('/eary/:id',adminAuth, (req, res)=> {
    const {id} =req.params;
    conn.query("delete from eary where?",{id:id},(err,result)=>{
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