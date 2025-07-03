const ShortUniqueId=require("shortid");
const URL=require("../models/url");
const shortid = require("shortid");


async function handleGenerateShortUrl(req,res){
    const body=req.body;
    if(!body.url){
       return res.status(400).json({error:"url is required"})
    }
    // const GenerateshortID= new ShortUniqueId({length:8});
    const shortID=ShortUniqueId();
    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitedHistory:[]
    });
    return res.json({newShortId:shortID});
}



async function getOriginalUrl(req,res){
    const shortID=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {
            shortId:shortID,
        },{
            $push:{
                visitedHistory:{timestamp:Date.now()}
            }
        },
        {new:true}
    );
    if(!entry){
        return res.status(400).json({err:"shortUrl not found"})
    }
    return res.redirect(entry.redirectUrl)
}



async function handleGetAnalytics(req,res){
    const shortID=req.params.shortId;
    const entry=await URL.findOne({shortId:shortID});
    if(!entry){
        return res.status(404).json({error:"shortId not found"})
    }
   return res.json({noOfTimeVisited:entry.visitedHistory.length}); 
}

module.exports={
    handleGenerateShortUrl,
    handleGetAnalytics,
    getOriginalUrl
}