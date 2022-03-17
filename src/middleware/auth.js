const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogsModel")


let authenticate = async function (req, res, next) {
  try {
    let token = req.headers['x-api-key']
    if (!token) return res.status(400).send({ status: false, msg: "please provide token" })
    let validateToken = jwt.verify(token, "group13")
    if (!validateToken) return res.status(401).send({ status: false, msg: "authentication failed" })
    next()
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

let authorise = async function (req, res, next) {
  let id = req.params.blogId
  
  let jwtToken = req.headers['x-api-key']
  // if(id!=jwtToken){
  //   return res.status(401).send({msg:"invalid id"})
  // }
  try {
    let blogs = await blogModel.findById(id)
    if (!blogs) return res.status(404).send({ status: false, msg: "please provide valid blog ID" })
    if (blogs.isDeleted == true) return res.status(404).send({ status: false, msg: "no such blog found" })

    let verifiedToken = jwt.verify(jwtToken, "group13")
    if (verifiedToken.authorId != blogs.authorId) return res.status(403).send({ status: false, msg: "unauthorize access " })

    next()
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}


module.exports.authenticate = authenticate
module.exports.authorise = authorise