const AuthorModel=require("../models/authorModel")
const validator=require( 'email-validator');
const  jwt=require("jsonwebtoken")

const createAuthor= async function(req,res)
{
    try{
    let data=req.body;
    if(Object.keys(data).length===0){
      return res.status(400).send({status:false, msg: "Please input some data to create"})
    } 
    let email = data.email;
    if(validator.validate(email.trim())== false)
    {
        return res.status(400).send({status:false, msg: "Please input a valid email"})
    }
    let duplicateEmail=await AuthorModel.findOne({email});
    if(duplicateEmail)
    {
        return res.status(400).send({status:false, msg: "Email is already in use"})
    }
    let savedData= await AuthorModel.create(data);
   return  res.status(201).send({status:true,data:savedData})
}
catch(error){
    return res.status(500).send({msg: "Error", error:error.message})
}
}

const loginUser = async function (req, res) {
    try{
    let userName = req.body.email;//extracted emailId in userName from body 
    let password = req.body.password;//extracted passwordd in password from body
  //validating emailId and password which is entered by user with the DB collection of user
  if(!userName || !password)
  {
    return res.status(400).send({status:false, msg:"email and password must be present"})
  }
    let author = await AuthorModel.findOne({ email: userName, password: password });
    if (!author)
    {
      return res.status(404).send({
        status: false,
        msg: "username or the password is not correct",
      });
    }
  
      let token = jwt.sign(
      {
        authorId: author._id.toString(),//extracting id from user variable defined above and converting it to string
      },
      "functionup-thorium-group13"
      
    );//Here in sign function we have generated token.
  
    res.setHeader("x-api-key", token);//setting header(key-value pair)in headers of response, 
    //Here:#key is such that it is recognized by both frontend and backend ,
    // and token is #value which is generated above in sign method/function
  
    return res.status(201).send({ status: true, data: token });
  }
  catch(error)
  {
    res.status(500).send({msg: "Error", Error:error.message})
  }
  };
module.exports.createAuthor=createAuthor;
module.exports.loginUser = loginUser;