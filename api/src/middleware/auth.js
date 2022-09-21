const  verifyToken  = require('../auth/verifyJWT.js')

const checkAuth = async (req, res, next) => {
    try {
        //TODO: authorization: Bearer 1010101010101001010100 
        const token = req.headers.authorization;//TODO:123123213
        const tokenData = await verifyToken(token);
        if (tokenData.id) {
            req.userId = tokenData.id;
            next();
        } else {
            res.status(409);
            res.send({ error: 'Tu por aqui no pasas!' });
        }

    } catch (e) {
        res.status(409);
        res.send({ error: 'Tu por aqui no pasas!' });
    }

}

module.exports = checkAuth;