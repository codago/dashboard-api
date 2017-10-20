module.exports = {
  isToken:function(req,res,next){
    let token = req.user ? req.session.passport.user.token : false
    if(req.session.passport && token){
      res.redirect('/home')
    }else{
       res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      next()
    }
  },
  dashboard:function(req,res){
    res.render('dashboard/dashboard', {
      title: 'Content Management System'
    });
  },
  linepage:function(req,res){
    res.render('dashboard/line', {
      title: 'Content Management System'
    });
  },
  piepage:function(req,res){
    res.render('dashboard/pie', {
      title: 'Content Management System'
    });
  },
  barpage:function(req,res){
    res.render('dashboard/bar', {
      title: 'Content Management System'
    });
  },
  mappage:function(req,res){
    res.render('dashboard/map', {
      title: 'Content Management System'
    });
  },
  loginpage:function(req,res){
    res.render('dashboard/login', {
      title: 'Content Management System'
    });
  },
  homepage:function (req,res) {
    res.render('user/home',{
      title:"Content Management System",
      user:req.session.passport ? req.session.passport.user.data.email : ""
    })
  },
  datapage:function(req,res){
    res.render('user/data',{
      title:"Content Management System"
    })
  },
  datadatepage:function(req,res){
    res.render('user/datadate',{
      title:"Content Management System"
    })
  },
  mapspage:function(req,res){
    res.render('user/maps',{
      title:"Content Management System"
    })
  },
  logout:function(req,res){
    req.logout()
    res.redirect('/')
  }
}
