const jwt = require("jsonwebtoken");

const getAcess = async (req, res, next) => {
    const tokenRequired = req.headers["x-acess-token"];
    if (tokenRequired) {
        jwt.verify(tokenRequired, process.env.SECRETKEY,(err,result)=>{
            if (result) {
                next();
            } else if(err) {
                res.status(404).json({ auth: false, message: "debes logearte nuevamente, no tienes acceso" });
            }
        })
    } else { res.status(406).json({ auth: false, message: "token requerido" }) }
}

module.exports = getAcess;