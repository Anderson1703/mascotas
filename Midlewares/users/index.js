const userModel = require("../../Database/models/users/index");
const mascotasModel = require("../../Database/models/mascotas/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const midle = {};

midle.getUser = (req, res) => {
  const { id } = req.params;
  if (id) {
    const op = userModel
      .findById({
        _id: id,
      }, { password: 0 })
      .populate("mascotas", {
        id: 0,
        user: 0,
      });
    op.then((result) => {
      if (result == null || result == {}) {
        res.status(404).json({ message: "usuario no existe" });
      } else {
        res.status(200).json(result);
      }
    }).catch((err) => {
      console.log(err);
      next({ err });
    });
  }
};

midle.createUser = (req, res, next) => {
  const { name, password } = req.body;
  if (name && password) {
    bcrypt
      .hash(password, 10)
      .then((passwordEncripted) => {
        userModel
          .create({
            name,
            password: passwordEncripted,
          })
          .then((result) => {
            res.status(201).json({ resgisted: true, message: "registrado correctamente", userId:result.id});
          })
          .catch((err) => {
            next({ status: 502, data: err });
          });
      })
      .catch((err) => {
        next({ status: 500 });
        console.log(err);
      });
  } else next({ status: 409 });
};


midle.loginUser = async(req, res, next) => {
  const { name, password } = req.body;
  if (name, password) {
    const userName = await userModel.findOne({ name: name });
    if (userName) {
      bcrypt.compare(password, userName.password)
        .then(result => {
          if (result == true) {
            jwt.sign({ id: userName.id }, process.env.SECRETKEY, {
              expiresIn:"7d"
            }, (err, tok) => {
              if (tok) {
                res.json({
                  auth: true,
                  token: tok
                });
              }
            })
          } else {
            res.status(404).json({ message: "password incorrecta" })
          }
        })
        .catch(err => {
          next({ status: 500 })
        })
    } else {
      res.status(404).json({ message: "nombre icorrecto" })
    }
  }
}

midle.updateUser = (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data) {
      userModel
        .findByIdAndUpdate({ _id: id }, data, { rawResult: true, password: 0 })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          next({ status: 502, data: err });
        });
    }
  } catch (error) {
    console.log(error);
  }
};


midle.deleteUser = (req, res, next) => {
  const { id } = req.params;
  //eliminar usuario//
  userModel
    .findByIdAndDelete({ _id: id })
    .then(() => {
      //eliminar todas las mascotas de ese usuario//
      mascotasModel.deleteMany({ user: id }, { runValidators: true })
        .then(result => {
          res.status(200).json({ eliminado: true });
        })
        .catch(error => {
          next({ status: 502, data: err });
          console.log(error);
        })
    })
    .catch((err) => {
      next({ status: 502, data: err });
    });
};

module.exports = midle;
