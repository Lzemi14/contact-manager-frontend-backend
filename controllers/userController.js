const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User= require("../models/userModel");
const jwt = require("jsonwebtoken");
//@desc Register a user 
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req,res)=>{

  const{ username,email,password}=req.body;
  if(!username||!password||!email)
    {
      res.status(400);
      throw new Error("all fields are mandatory!")
    }
    const userAvail = await User.findOne({email}); 
    if(userAvail)
      {
        res.status(400);
        throw new Error("user already registerd!");
      }
     //hash pwd
     const hasedpwd = await bcrypt.hash(password,10);
     console.log('hasedpwd:' ,hasedpwd);
    const user = await User.create({
       username,email,password:hasedpwd,
    });
    console.log(`user created ${user}`);
    if(user)
      {
        res.status(201).json({
          _id:user.id,
          email:user.email,

        })
      }
      else {
        res.status(400);
        throw new Error("user data is not valid");
      }
  res.json({
     message : "Register the user "
  });
});

//@desc Login user 
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
  const {email,password}=req.body;
  if(!email||!password){
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({email});
  //compare password with hased pwd
 if(user && (await bcrypt.compare(password,user.password)))
  {
    const accessToken = jwt.sign({
      user:{
         username: user.username,
         email:user.email,
         id:user.id,
      },

    },process.env.ACCESS_TOKEN_SECERT,
    {expiresIn : "15m"}
  );
      res.status(200).json({accessToken});
  }
  else 
  {
      res.status(401);
      throw new Error("password is not valid");
  }
});

//@desc user info 
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler((req,res)=>{
   res.json(req.user);
});

module.exports ={registerUser,loginUser,currentUser};