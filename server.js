const express = require("express");
const cors = require("cors");

const app = express();
app.set('view engine', 'pug')

app.use(express.static(__dirname+"/app/public"))
app.use(cors());
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//middleware
require("./app/routes/user.routes")(app);

// simple route
app.use((req, res,next) => {
  if(req.cookies.username){
    next()
  }
  else{
    res.redirect("login.html")
  }
});
app.get("/",function(req,res){
  res.redirect("Home.html")
})
require("./app/routes/turorial.routes")(app);
require("./app/routes/pages.routes")(app);
require("./app/routes/userdashboard.routes")(app);
require("./app/routes/postcategories.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
