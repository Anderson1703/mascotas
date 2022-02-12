const userModel = require("../../Database/models/users/index");
const bcrypt = require("bcrypt");
const midle = {};

midle.getUser = (req, res) => {
  const { id } = req.params;
  if (id) {
    const op = userModel
      .findById({
        _id: id,
      })
      .populate("mascotas", {
        id: 0,
        user: 0,
      });
    op.then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
      next({ status: 502 });
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
            res.status(201).json(result);
          })
          .catch((err) => {
            next({ status: 502 });
          });
      })
      .catch((err) => {
        next({ status: 500 });
        console.log(err);
      });
  } else next({ status: 409 });
};

midle.updateUser = (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data) {
      userModel
        .findByIdAndUpdate({ _id: id }, data, { rawResult: true })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          next({ status: 502 });
        });
    }
  } catch (error) {
    console.log(error);
  }
};

midle.deleteUser = (req, res, next) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next({ status: 502 });
    });
};

module.exports = midle;
