const jwt = require("jsonwebtoken");


const authenticationUser=function(req,res,next)
{
  try {
    let token = req.headers["x-api-key"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

 let decodedToken = jwt.verify(token, "functionup-thorium-group13");//verifying token with secret key
 

  if (!decodedToken)
    return res.status(401).send({ status: false, msg: "token is invalid" });//validating token value inside decodedToken
    req.authorId = decodedToken.authorId;


  next();
  
}
catch(error)
{
  res.status(500).send({msg:"Error", error:error.message})
}
}

const authorisationUser=function(req,res,next)
{
  try {
  let token = req.headers["x-api-key"];

  let decodedToken = jwt.verify(token, "functionup-thorium-group13");

  let authorisedUser=decodedToken.authorId;
  let logedInUser=req.params.authorId;
 
  if(authorisedUser!==logedInUser) return res.status(401).send({status:false,msg:"You are not an authorized person to make these changes"})
  next();  
}
catch(error)
{
  return res.status(500).send({msg:"Error", error:error.message})
}
}
module.exports.authenticationUser = authenticationUser;

module.exports.authorisationUser = authorisationUser;