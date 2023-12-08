const Fuse = require("fuse.js")
const blog = require("../models/blog.schema")
const user = require("../models/user.schema")

const signup = async (req, res) => {
    try {
        let data = await user.findOne({ email: req.body.email })
        if (!data) {
            let data = await user.create(req.body)
            return res.cookie("role", data.role).cookie("id", data.id).send(`Account created successfully ${data.username}`)
        }
        else {
            return res.cookie("role", data.role).cookie("id", data.id).cookie("author", data.username).send(`Account created successfully ${data.username}`)
        }
    }
    catch (error) {
        return res.send(error.message)
    }
}

const signuppage = (req, res) => {
    res.render("signup")
}

const login = async (req, res) => {
    try {
        const data = await user.findOne({ email: req.body.email })
        if (!data) {
            res.send("Invalid Credentials.")
        }
        else {
            return res.cookie("id", data.id).cookie("role", data.role).send(`Welcome User ${data.username}`)
        }
    }
    catch (error) {
        return res.send(error.message)
    }
}

const loginpage = (req, res) => {
    res.render("login")
}

const createblog = async (req, res) => {
    const { author } = req.cookies
    const { title, content, category, image } = req.body
    let data = { title, content, category, image, author: author }
    try {
        let newblog = await blog.create(data)
        return res.cookie("blogId", newblog.id).send(`blog created by ${data.author}`)
    }
    catch (error) {
        return res.send(error.message)
    }
}

const blogpage = (req, res) => {
    res.render("blog")
}

const blogcategory = async (req, res) => {
    try {
        let data = await blog.find()
        res.send(data)
    }
    catch (error) {
        return res.send(error.message)
    }
}

const homepage = async (req, res) => {
    res.render("home")
}

const blogdelete = async (req, res) => {
    const { id } = req.params
    try {
        let data = await blog.findByIdAndDelete(id)
        if (data) {
            res.send("blog deleted")
        }
        else {
            res.send("id is not define")
        }
    }
    catch (error) {
        return res.send(error.message)
    }
}

const blogupdate = async (req, res) => {
    const { id } = req.params
    try {
        let data = await blog.findByIdAndUpdate(id)
        if (data) {
            res.send(req.body)
        }
        else {
            res.send("blog is not availble")
        }
    }
    catch (error) {
        return res.send(error.message)
    }
}

const singleBlog = async (req, res) => {
    const { id } = req.params
    try {
        let singleBlog = await blog.findById(id)
        res.render("singleblogpage", { singleBlog })
    }
    catch (error) {
        return res.send(error.message)
    }
}

const likebutton = async (req, res) => {
    let blogId = req.params.id;
    try {
        let blogdata = await blog.findById(blogId);
        let userdata = await user.findById(req.cookies.id);
        blogdata.likedBy.push({ username: userdata.username });
        await blogdata.save();
        res.send(blogdata);
    }
    catch (error) {
        return res.send(error.message)
    }
}

const comment = async (req, res) => {
    let blogId = req.params.id;
    try {
        let blogdata = await blog.findById(blogId);
        let userdata = await user.findById(req.cookies.id);
        blogdata.comments.push({ username: userdata.username, text: req.body.text });
        await blogdata.save();
        res.send(blogdata);
    }
    catch (error) {
        return res.send(error.message)
    }
}

const blogsearch = async (req, res) => {
    let query = req.query.blogs;
    try {
        const blogs = await blog.find();

        const options = {
            keys: ["author", "category", "title"],
        };
        const fuse = new Fuse(blogs, options);
        const result = fuse.search(query);
        res.send(result)
    }
    catch (error) {
        return res.send(error.message)
    }
}

module.exports = { signup, signuppage, login, loginpage, blogpage, createblog, blogcategory, homepage, blogdelete, blogupdate, singleBlog, likebutton, comment, blogsearch }