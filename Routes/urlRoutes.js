const express=require("express")

const shortid = require("shortid")
const UrlModel = require("../Models/urlModel")


const UrlRouter=express.Router()

// this route for creating a short url 
UrlRouter.post("/add",async (req,res)=>{
    const { url } = req.body
    

    try {
        const urlPresent = await UrlModel.findOne({ originalUrl: url })
        if(urlPresent){
            return res.status(201).send({ msg: "This URL has already been shortened before",urlPresent })
        }
        if (!url) {
            return res.status(209).send({ msg: "url Required" })
        }
        const shortId = shortid()
       
        const ShortUrl= `https://gurucool-url.onrender.com/url/${shortId}`
        const newUrl = new UrlModel({ shortUrl: ShortUrl, originalUrl: url})
        // console.log(newUrl)
        await newUrl.save()
        return res.status(200).send({ msg: "Shorturl created", shortUrl: ShortUrl, originalUrl: url })
    } catch (error) {
        console.log(error)
        return res.status(401).send({ msg: error.message })
    }

})


//  This Route for Redirect from short url to original url
UrlRouter.get("/:shortId",async(req,res)=>{
    const { shortId } = req.params
    const ShortUrl= `https://gurucool-url.onrender.com/url/${shortId}`
    const Url = await UrlModel.findOne({ shortUrl: ShortUrl })
    if(!Url){
        return res.status(404).send({ msg: "This short URL is not in our database, so redirection is not possible." })
    }
    // console.log("Redirect:--",Url)
    res.redirect(Url.originalUrl)
})


module.exports = { UrlRouter }