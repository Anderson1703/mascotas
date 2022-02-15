const { Router } = require("express");
const Rutes = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../../Database/models/users/index")

Rutes.post("/", async (req, res, next) => {
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
});

module.exports = Rutes;
