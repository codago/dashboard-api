const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/index')


module.exports = {
  register:function(req,res){
    let email = req.body.email
    let password = req.body.password
    let retypepassword = req.body.retypepassword

    User.findOne({
      email:req.body.email
    },function(err,user){
      if(err)res.json({success:false,message:err})
      if(user){
        return res.json({success:false,message:"Authentication failed. Email already exist"})
      }else if(password != retypepassword){
        return res.json({success:false,message:"Authentication failed. Password dont match"})
      }else{
        let newUser = new User()
        newUser.email = req.body.email
        newUser.password = newUser.generateHash(req.body.password)

        newUser.save(function(err,user){
          if(err){
            res.json({success:false,msg:err})
          }
          let token = jwt.sign({id:newUser._id,email:user.email},config.secretkey,{
            expiresIn: 86400
          })
          let storeEmail = {email:user.email}
          res.json({
            success:true,
            data:user,
            token:token
          })
        })
      }
    })
  },
  login:function(req,res){
    User.findOne({
      email:req.body.email
    },function(err,user){
      if(err)throw err
      if(!user){
        res.json({success:false,message:'Authentication failed. User not found.'})
      }else if(user){
        if(!user.validPassword(req.body.password)){
          res.json({success:false,message:'Authentication failed. Wrong password.'})
        }else{
          let token = jwt.sign({id:user._id,email:user.email},config.secretkey,{
            expiresIn:86400
          })
          let storeEmail = {email:user.email}
          res.json({
            success:true,
            data:user,
            token:token
          })
        }
      }
    })
  },
  check:function(req,res){
    res.json({valid:true})
  },
  destroy:function(req,res){
      res.json({logout:true})
  },
  findbyid:function(req,res){
    User.findById(req.params.id,function(err,data){
      if(err)res.json({success:false,message:"data have not been found"})
      else res.json({success:true,message:"data found",data:data})
    })
  }
}
