const {config} = require("dotenv")
const mongoose = require("mongoose")
require("dotenv").config()

const connected = async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log("connected");
}

module.exports= connected