const mongoose = require("mongoose");
const errorController = (err, req, res, next) => {
    if (err.code == 11000) {
        res.status(406).json({
            mesaage: "el nombre de esta mascota ya existe"
        });
    } else if (err.status == 409) {
        res.status(409).json({
            message: "data incompleta, asegurese de haber enviado los campos obligatorios",
        });
    }
    else if (err.name == "CastError") {
        res.status(404).json({
            message: "not found ):",
        });
    }
    else if (err.status==410) {
        res.status(410).json({
            message: "aun no existen mascotas",
        });
    }
    else if (err.status==500) {
        res.status(500).json({
            message: "error en el servidor",
        });
    }
    else if (err.status==502) {
        res.status(502).json({
            message: "respuesta externa inesperada o incorrecta",
        });
    }
    else {
       res.send(err);
    }
}

module.exports = errorController;