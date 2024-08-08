const express=require("express")
const cors=require("cors")


const connection = require("./Config/DB")
const { UrlRouter } = require("./Routes/urlRoutes")
const { UserRouter } = require("./Routes/UserRoutes")
const { Auth } = require("./Middleware/Auth")



const app=express()
app.use(cors())
app.use(express.json())


//  User Route
app.use("/user",UserRouter)

// This is an auth middleware we can use if need 


// app.use(Auth)


// Url Route
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