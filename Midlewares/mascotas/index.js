const mascotasModel = require("../../Database/models/mascotas/index");
const userModel = require("../../Database/models/users/index");
const midle = {};

midle.saveMascotas = (req, res, next) => {
  const data = req.body;
  if ((data.especie && data.raza && data.nombre, data.userId)) {
    const newMascota = {
      especie: data.especie,
      raza: data.raza,
      nombre: data.nombre,
      user: data.userId,
    };
    userModel
      .findById({ _id: data.userId })
      .then(response => {
        if (response == null || response == {}) {
          res.status(404).json({ message: "usuario no existe" });
        }else{
          mascotasModel
          .create(newMascota)
          .then((result) => {
            const idMascota = result._id;
            const mascotasUpdated = [...response.mascotas, idMascota];
            userModel
              .findByIdAndUpdate(
                { _id: data.userId },
                { mascotas: mascotasUpdated }
              )
              .then(() => {
                res.status(201).json(result);
              })
              .catch((err) => {
                console.log(err);
                next({ status: 502 });
              });
          })
          .catch((err) => next(err));
        }

      })
      .catch((err) => {
        console.log(err);
        next({ status: 502 });
      });
  } else {
    next({
      status: 409,
    });
  }
};

midle.getMascotas = (req, res, next) => {
  try {
    const op = mascotasModel.find({}).populate("user", {
      mascotas: 0,
      password: 0,
    });
    op.then((result) => {
      if (result.length <= 0) {
        next({
          status: 410,
        });
      } else {
        res.status(200).json(result);
      }
    }).catch((err) => {
      console.log(err);
      next({ status: 502 });
    });
  } catch (error) {
    console.log(error);
  }
};

midle.getOneMascota = (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const op = mascotasModel
      .findById({
        _id: id,
      })
      .populate("user", {
        mascotas: 0,
        password: 0,
      });
    op.then((result) => {
      if (result==null || result== {}) {
        res.status(404).json({ message: "la mascotas no existe" });
       } else {
        res.status(200).json(result);
       }
    }).catch((err) => {
      console.log(err);
      next({ status: 502 });
    });
  }
};

midle.deleteOneMascota = (req, res, next) => {
  const { id } = req.params;
  if (id) {
    mascotasModel
      .findByIdAndDelete(
        {
          _id: id,
        },
        { runValidators: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  }
};

midle.updateOneMascota = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  if (data) {
    mascotasModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        data,
        {
          rawResult: true,
        }
      )
      .then((result) => {
        res.status(200).json(result.value);
      })
      .catch((err) => {
        console.log(err);
        next({ status: 502 });
      });
  }
};

midle.resetMascotas = (req, res, next) => {
  mascotasModel
    .deleteMany({}, { runValidators: true })
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      console.log(err);
      next({ status: 502 });
    });
};

module.exports = midle;
