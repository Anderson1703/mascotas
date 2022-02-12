const {Schema, model}=require("mongoose");

const SchemaUsers=new Schema({
    name:{
        type:String,
        max:15,
        min:5,
        required:true,
        unique:true
    },
    password:{
        type:String,
        match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
        required:true,
        min:8
    },
    mascotas:[{
        type:Schema.Types.ObjectId,
        ref:"mascotas"
    }]
})


SchemaUsers.set("toJSON",{
    transform:(doc,ret)=>{
      ret.id=ret._id
      delete ret._id
      delete ret.__v
      delete password
    }
  })

const userModel=model("users",SchemaUsers);

module.exports=userModel;