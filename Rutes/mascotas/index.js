const { Router } = require("express");
const Rutes = Router();
const {
  getMascotas,
  saveMascotas,
  getOneMascota,
  deleteOneMascota,
  updateOneMascota,
  resetMascotas
} = require("../../Midlewares/mascotas/index");

Rutes.get("/", getMascotas);
Rutes.post("/", saveMascotas);
Rutes.delete("/", resetMascotas);
Rutes.get("/:id", getOneMascota);
Rutes.put("/:id", updateOneMascota);
Rutes.delete("/:id", deleteOneMascota);
module.exports = Rutes;
