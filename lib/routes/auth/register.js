const express = require('express');
const router = express.Router(); 
const conn = require("../../db/connection");

const AuthView = require('../../view/auth_view');


router.post('/register', (req, res) => {
    const data = req.body;
    new AuthView().register(data, res);
    // res.send(data);
    // conn.query("insert into user set ?",{firstName: data.firstName ,lastName: data.lastName ,email: data.email ,password: data.password ,phone: data.phone},(err,result,fields)=>{
    //     if(err)
    //     {
    //         res.statusCode=400;
    //         res.json({
    //             message:" failed save"
    //       });
    //     }
    //     else{
    //         res.json({
    //             message:" created done",
    //        });
    //     }
    // })

})
module.exports = router;