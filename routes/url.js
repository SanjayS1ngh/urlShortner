const express=require("express")
const router=express.Router()
const{handleGenerateShortUrl,handleGetAnalytics,getOriginalUrl}=require("../controllers/url")
router.route("/")
.post(handleGenerateShortUrl);



router.route("/analytics/:shortId")
.get(handleGetAnalytics);

module.exports=router