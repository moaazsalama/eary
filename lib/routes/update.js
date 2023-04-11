const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();
const adminAuth=require("../middleware/admin");
const conn =require("../db/connection");
const update=[];
router.get('/update',(req, res)=> {
    conn.query("SELECT * FROM  user",(err,result,fields)=>{
       // console.log(err,result,fields);
        res.json(result);
    });
   
  });
router.put('/update/:ID',adminAuth, (req, res)=> {
    const {ID} =req.params;
    const data=req.body;
    conn.query("update user set? where?",
    [{firstName:data.firstName,lastName:data.lastName,email:data.email,password:data.password,phone:data.phone,status:data.status,type:data.type}
        ,{ID:ID}],
    (err,result)=>{
        if(err)
        {
            res.statusCode=500;
            res.json({message:"faild update"});
        }
        res.json("updated done");
    });
  });
  module.exports = router;