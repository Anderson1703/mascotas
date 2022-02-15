const { Router } = require("express");
const getAcess = require("../../Midlewares/acess/index");
const Rutes = Router();
const {
  getMascotas,
  saveMascotas,
  getOneMascota,
  deleteOneMascota,
  updateOneMascota,
  resetMascotas
} = require("../../Midlewares/mascotas/index");

Rutes.get("/", getAcess ,getMascotas);
Rutes.post("/", getAcess,saveMascotas);
Rutes.delete("/",getAcess ,resetMascotas);
Rutes.get("/:id", getAcess,getOneMascota);
Rutes.put("/:id",getAcess ,updateOneMascota);
Rutes.delete("/:id", getAcess,deleteOneMascota);
module.exports = Rutes;
