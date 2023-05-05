class Response{
    static success(res, data, message = 'Success', code = 200){
        res.status(code).json({
            message,
            data
        })
    }
    static error(res, message = 'Error', code = 400){
        res.status(code).json({
            message
        })
    }
    static response(res,data, message, code){
        res.status(code).json({
            message,
            data
        })
    }
    
}
module.exports = Response;