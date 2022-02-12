const {Router}=require("express");
const Rutes=Router();

Rutes.get("/",(req, res)=>{
    res.send("principal");
})

module.exports=Rutes;