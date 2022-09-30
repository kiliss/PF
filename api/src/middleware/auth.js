const verifyToken = require('../auth/verifyJWT.js')

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenData = await verifyToken(token);
        if (tokenData.id) {
            req.userId = tokenData.id;
            next();
        } else {
            res.status(409);
            res.send({ error: '¡Tu por aqui no pasas!' });
        }
    } catch (e) {
        res.status(409);
        res.send({ error: '¡Tu por aqui no pasas!' });
    }
}

const isUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenData = await verifyToken(token);
        if (tokenData.id) {
            next();
        } else {
            res.status(409);
            res.send({ error: '¡Tu por aqui no pasas!' });
        }
    } catch (e) {
        res.status(409);
        res.send({ error: '¡Tu por aqui no pasas!' });
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenData = await verifyToken(token);
        if (tokenData.id && tokenData.admin === true) {
            next();
        } else {
            res.status(409);
            res.send({ error: '¡Tu por aqui no pasas!' });
        }
    } catch (e) {
        res.status(409);
        res.send({ error: '¡Tu por aqui no pasas!' });
    }
}

module.exports = {
    checkAuth,
    isUser,
    isAdmin
};