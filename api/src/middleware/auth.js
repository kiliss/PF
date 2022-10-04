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
            res.send({ error: '¡Tu por aqui no pasas, solo usuarios!' });
        }
    } catch (e) {
        res.status(409);
        res.send({ error: '¡Tu por aqui no pasas, solo usuarios!' });
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
            res.send({ error: '¡Tu por aqui no pasas, solo usuarios!' });
        }
    } catch (e) {
        res.status(409);
        res.send({ error: '¡Tu por aqui no pasas, solo usuarios!' });
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
            res.send({ error: '¡Tu por aqui no pasas, solo admins!' });
        }
    } catch (e) {
        res.status(409);
        res.send({ error: '¡Tu por aqui no pasas, solo admins!' });
    }
}

module.exports = {
    checkAuth,
    isUser,
    isAdmin
};