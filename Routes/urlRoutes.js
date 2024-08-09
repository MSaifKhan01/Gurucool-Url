const express = require("express");

// const shortid = require("shortid")
const UrlModel = require("../Models/urlModel");

const UrlRouter = express.Router();

// for generating uniq id
function UniqueIdFn() {
  let date = Date.now().toString(36);
  let random = Math.random().toString(36).substr(2, 9);
  let UniqId = date + random;
  // console.log(UniqId)

  return UniqId;
}

// this route for creating a short url
UrlRouter.post("/add", async (req, res) => {
  const { url } = req.body;
  //   console.log(typeof url);

  if (!url) {
    return res.status(209).send({ msg: "url Required" });
  }

  // Regular expression for basic URL validation
  const urlPattern =
    /^(https?|ftp):\/\/([^\s$.?#].[^\s]*)\.(com|in|org|net|gov|edu)(\/[^\s]*)?$/i;

  if (!urlPattern.test(url)) {
    return res.status(400).send({ msg: "Invalid URL format" });
  }

  
  try {
  
    const urlPresent = await UrlModel.findOne({ originalUrl: url });
    if (urlPresent) {
      return res.status(201).send({
        msg: "This URL has already been shortened before",
        urlPresent,
      });
    }

    // const shortId = shortid()

    const shortId = UniqueIdFn();

    const ShortUrl = `https://gurucool-url.onrender.com/url/${shortId}`;

    const newUrl = new UrlModel({ shortUrl: ShortUrl, originalUrl: url });
    // console.log(newUrl)
    await newUrl.save();
    return res
      .status(200)
      .send({ msg: "Shorturl created", shortUrl: ShortUrl, originalUrl: url });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ msg: error.message });
  }
});

//  This Route for Redirect from short url to original url
UrlRouter.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const ShortUrl = `https://gurucool-url.onrender.com/url/${shortId}`;

  const Url = await UrlModel.findOne({ shortUrl: ShortUrl });
  if (!Url) {
    return res.status(404).send({
      msg: "This short URL is not in our database, so redirection is not possible.",
    });
  }
  // console.log("Redirect:--",Url)
  res.redirect(Url.originalUrl);
});

module.exports = { UrlRouter };
