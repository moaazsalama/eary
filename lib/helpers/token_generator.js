const jwt = require('jsonwebtoken');
class TokenGenerator {
    static secret = 'secretkey@123';
    // constructor() {
    //     // this.secret = process.env.JWT_SECRET; // use this in production

    // }
    //controller in {userId: user.ID}
    static generate(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: '4h' });
    }
    static verify(token, handelError) {
        return jwt.verify(token, this.secret, handelError);
    }
}
module.exports = TokenGenerator;