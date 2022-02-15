const {Router}=require("express");
const {getUser, createUser, updateUser, deleteUser}=require("../../Midlewares/users/index");
const Rutes=Router();

Rutes.post("/register", createUser);
Rutes.get("/:id",getUser);
Rutes.put("/:id",updateUser);
Rutes.delete("/:id",deleteUser);

module.exports=Rutes;