const express=require('express');
const router = express.Router();
const conn =require("../db/connection");
const {v4}=require('uuid');
const adminAuth=require("../middleware/admin");

router.get('/MUserAccounts',adminAuth,(req, res)=> {
    conn.query("select * from user where type=0",(err,result,fields)=>{
        if( result)
        {
            res.json(result);
        }
       else{
        res.statusCode=404;
        res.json({
            message:"not found",
        });
       }
    });
  });
router.put('/MUserAccounts/:id',adminAuth,(req,res)=>{
    const {id}=req.params;
    const data=req.body;
    conn.query("update user set ? where ID= ?",[{status: data.status}, id],(err,result)=>{
        if(err)
        {
            res.statusCode=400;
            res.json({
                message:" failed save"
          });
        }
        else{
            res.json(result);
        }
    })
})
module.exports=router;