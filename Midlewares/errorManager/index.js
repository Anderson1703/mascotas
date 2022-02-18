const errorController = (err, req, res, next) => {
    if (err.status == 409) {
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
        if (err.data.code == 11000) {
            res.status(406).json({
                mesaage: "Este nombre ya existe"
            });
        }
        res.status(502).json({
            message: "respuesta externa inesperada o incorrecta",
            error:err.data
        });
    }
    else {
       res.send(err);
    }
}

module.exports = errorController;