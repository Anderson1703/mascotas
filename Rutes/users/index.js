const {Router}=require("express");
const {getUser, createUser, updateUser, deleteUser, loginUser}=require("../../Midlewares/users/index");
const Rutes=Router();

Rutes.post("/register", createUser);
Rutes.post("/login", loginUser);
Rutes.get("/:id",getUser);
Rutes.put("/:id",updateUser);
Rutes.delete("/:id",deleteUser);

module.exports=Rutes;