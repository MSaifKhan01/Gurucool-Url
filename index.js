const express=require("express")


const cors=require("cors")
const connection = require("./Config/DB")
const { UrlRouter } = require("./Routes/urlRoutes")



const app=express()
app.use(cors())
app.use(express.json())




app.use("/url",UrlRouter)



app.listen(4000,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("connected to server")
})