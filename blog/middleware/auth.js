const user = require("../models/user.schema");

const middleware = (req, res, next) => {
    const { title, content, category, image } = req.body
    if (title && content && category && image) {
        next()
    }
    else {
        res.status(400).send("All fields are required.");
    }
}

const findcookies = async (req, res, next) => {
    let { id } = req.cookies
    if (id) {
        let data = await user.findById(id)
        if (data.role == "admin") {
            next()
        }
        else {
            res.send("You are not authorized to access this page.")
        }
    }
    else{
        res.send("first login")
    }
}

const userid = (req,res,next)=>{
    const {id} = req.cookies
    if(id){
        next()
    }
    else{
        res.send("first you login or signup")
    }
}

module.exports = { middleware, findcookies,userid }