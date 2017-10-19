module.exports = function(req,res,next){
  let isNext = req.user ? req.user.data.success : false
  if(isNext){
    return next()
  }
  res.redirect('/')
}
