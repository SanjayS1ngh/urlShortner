const express=require("express");
const app=express();
const port=8000;
app.use(express.json());
const router=require("./routes/url")
const {getOriginalUrl}=require("./controllers/url");
const {connectToMongoose}=require("./connection")
connectToMongoose( "mongodb://127.0.0.1:27017/shortUrl")

app.use("/url",router);
app.get("/:shortId",getOriginalUrl)


app.listen(8000,()=>{
    console.log(`server is listening at `,port);
})