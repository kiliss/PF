const  verifyToken  = require('../auth/verifyJWT.js')

const checkAuth = async (req, res, next) => {
    console.log(req.headers.authorization);
    try {
        //TODO: authorization: Bearer 1010101010101001010100 
        const token = req.headers.authorization//TODO:123123213
        const tokenData = await verifyToken(token)
        console.log(tokenData);
        if (tokenData.id) {
            req.userId = tokenData.id;
            next();
        } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}

module.exports = checkAuth