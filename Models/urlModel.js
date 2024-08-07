const mongoose=require("mongoose")

const urlSchema=mongoose.Schema({
    shortUrl:{type:String,unique:true},
    originalUrl:String,

}
,
{timestamps:false}
)

const UrlModel=mongoose.model("url",urlSchema)

module.exports=UrlModel