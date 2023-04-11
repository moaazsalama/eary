const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();
const adminAuth=require("../middleware/admin");
const conn =require("../db/connection");
const showdegree=[];
//get special data
router.get('/showdegree/:ID',(req, res)=> {
    const {ID} =req.params;
    conn.query("select * from history where ?",{ID:ID},(err,result,fields)=>{
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
  module.exports = router;