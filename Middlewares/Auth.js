const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.session = function (req, res, next) {
    try {
        const tokenRequest = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : null;

        if (!tokenRequest) {
            res.status(401).send({ msg: "invalid_session", code: "401" });
            return;
        }

        JWT.verify(tokenRequest, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send({ msg: "invalid_session", code: "401" });
            } else {
                req.data = decoded;

                next();
            }
        });
    } catch (error) {
        res.status(500).send({
            msg: "error_get_token",
            code: "500",
        });
    }
};
