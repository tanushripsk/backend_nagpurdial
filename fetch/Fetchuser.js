var jwt = require('jsonwebtoken')
const jwt_key = 'gayatrimam@123';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'please auth using valid token' })
    }
    try {
        const data = jwt.verify(token, jwt_key);
        req.user = data.user;
        next()
    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error')
    }
}

module.exports = fetchuser