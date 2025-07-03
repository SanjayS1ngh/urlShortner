const mongoose=require("mongoose");
function connectToMongoose(url){
    mongoose.connect(url).then(()=>{
        console.log("connection successfull")}).catch((error)=>{
        console.log(error)
    })
} 

module.exports={connectToMongoose}