const bcrypt = require('bcryptjs');
class Encrypt {
    static encryptPassword(password) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    static  comparePassword(password, hash) {
        let hashPassword = Encrypt.encryptPassword(password);
    //     console.log(hashPassword);
    //     console.log(hash);
    //     console.log(password);
    // //   var value=  await bcrypt.compare(hashPassword, hash);
    // //   console.log(value);
    //     console.log(bcrypt.compareSync(password, hash));
        return bcrypt.compareSync(password, hash);
    }
}
module.exports = Encrypt;