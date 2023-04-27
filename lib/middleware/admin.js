const authModel = require("../model/authModel");

const adminAuth = async (req, res, next) => {

    // const{admin}=req.headers;
    var user = await authModel.getUserById(req.userId);
    //serlize user
    user = JSON.parse(JSON.stringify(user));

    console.log(user.type);
    if (user[0].type == 1) next();
    else {
        res.statusCode = 403;
        res.send({
            message: "you are not admin",
        });
    }
}
module.exports = adminAuth;