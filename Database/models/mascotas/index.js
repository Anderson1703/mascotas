const { Schema, model } = require("mongoose");

const SchemaOfMascotas = new Schema({
  especie: {
    type: String,
    max: 20,
    min: 5,
    required: true,
  },
  raza: {
    type: String,
    type: String,
    max: 20,
    min: 5,
    required: true,
  },
  nombre: {
    type: String,
    max: 30,
    min: 5,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    max: 20,
    min: 3,
    default: "black",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:"users"
  },
  fecha: {
    type: Date,
    default: Date.now(),
  }
});

SchemaOfMascotas.set("toJSON",{
  transform:(doc,ret)=>{
    ret.id=ret._id
    delete ret._id
    delete ret.__v
  }
})

const mascotasModel = model("mascotas", SchemaOfMascotas);

module.exports = mascotasModel;
