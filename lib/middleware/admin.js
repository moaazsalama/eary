const authModel = require("../model/authModel");

//one Server side (node js (backend)))
//many client side (react js (frontend)) // 1. user 2. admin
const adminAuth = async (req, res, next) => {

    // const{admin}=req.headers;
    var user = await authModel.getUserById(req.userId);
    //serlize user
    user = JSON.parse(JSON.stringify(user));

    console.log(user.type);
    if (user[0].type == 1) return next();
    else {
        res.statusCode = 403;
        return res.send({
            message: "you are not admin",
        });
    }
}
module.exports = adminAuth;