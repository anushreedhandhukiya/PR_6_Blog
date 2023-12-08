const express = require("express");
const cookies = require("cookie-parser")
const router = require("./routes/routes");
const connected = require("./config/db");

const app = express()

app.use(express.json())
app.use(cookies())
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use(express.static(__dirname + "/public"))

app.get("/",(req,res)=>{
    res.send("Welcome to the movie API")
})

app.use(router)

app.listen(8090, () => {
    console.log("listing port 8090");
    connected()
})