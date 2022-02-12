const mongoose=require("mongoose");
const uri=process.env.NODE_ENV=="test"?process.env.URI_TEST:process.env.URI_PRINCIPAL;

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(res=>console.log("connected"))
.catch(err=>console.log(`not connected ${err}`));