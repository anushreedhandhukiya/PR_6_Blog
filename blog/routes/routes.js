const {Router}=require("express")
const Fuse = require("fuse.js")
const { signup, signuppage, login, loginpage, blogpage, createblog, blogcategory, homepage, blogdelete, blogupdate, singleBlog, likebutton, comment, blogsearch } = require("../controllers/controllers")
const { findcookies, middleware, userid } = require("../middleware/auth")

const router=Router()

//user
router.post("/user/signup",signup)
router.get("/user/signup",signuppage)
router.post("/user/login",login)
router.get("/user/login",loginpage)

//blog
router.post("/blog/create",middleware,createblog)
router.get("/blog/create",findcookies,blogpage)
router.get("/blog/blogs",blogcategory)
router.get("/blog/",homepage)
router.delete("/blog/delete/:id",blogdelete)
router.patch("/blog/edit/:id",findcookies,blogupdate)
router.get("/blog/singleBlog/:id",singleBlog)
router.patch("/blog/like/:id",userid,likebutton)
router.patch("/blog/comment/:id",comment)
router.get("/blog/search",blogsearch)

module.exports=router