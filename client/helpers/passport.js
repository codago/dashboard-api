const LocalStrategy = require('passport-local').Strategy
var axios = require('axios')
module.exports = function(passport){
  passport.serializeUser(function(user,done){
    done(null,user)
  })
  passport.deserializeUser(function(user,done){
    let id = user.data ? user.data._id:0
    axios.get(`http://localhost:3001/api/users/${id}`)
    .then(function(user){
      done(null,user)
    })
    .catch(function(error){
      done(null,error)

    })
  })

  passport.use('local-signup',new LocalStrategy({
    usernameField:"email",
    passwordField:"password",
    passReqToCallback:true
  },function(req,email,password,done){
    if(email){
      email = email.toLowerCase()
    }
    if(!req.user){
      axios.post('http://localhost:3001/api/users/register',{
        email:email,
        password:password,
        retypepassword:req.body.retypepassword
      })
      .then(function(response){
        if(response.data.success){
          return done(null,response.data)
        }
        return done(null,false)
      })
      .catch(function(error){
        return done(null,false)
      })
    }else{
      return done(null,req.user)
    }
  }))

  passport.use('local-login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
  },function(req,email,password,done){
    if(email){
      email = email.toLowerCase()
    }
    axios.post('http://localhost:3001/api/users/login',{
      email:email,
      password:password
    })
    .then(function(response){
      if(response.data.success){
        return done(null,response.data)
      }
      return done(null,false)
    })
    .catch(function(error){
      return done(null,false)
    })
  }))
}
