const bcrypt = require('bcryptjs');
class Encrypt {
    static encryptPassword(password) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }
   // password=moaaz; hash=$2a$10$zkb.xI69NMJWykuZ259yQeVtX4KUopjs50zkjc9Y8MvxMLzdx9iji
    static  comparePassword(password, hash) {
    
        return bcrypt.compareSync(password, hash);
    }
}
module.exports = Encrypt;