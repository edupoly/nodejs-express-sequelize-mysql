const express = require("express");
const cors = require("cors");

const app = express();
app.set('view engine', 'pug')
module.exports = app => {
  
  var router = require("express").Router();


  router.get("/admin", function(req,res){
    res.redirect("/admin.html")
  });
  router.get("/user", function(req,res){
    res.redirect("/user.html")
  });


  app.use('/api/userdashboard', router);
};
