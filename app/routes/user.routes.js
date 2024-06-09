module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/register", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  //login user
  router.post("/login",users.login)

  // Retrieve a single User with username
  router.get("/:username", users.findOne);

  // Update a Users with id
  router.put("/:id", users.update);

  // Delete a Users with id
  router.delete("/:id", users.delete);

  // Delete all Users
  router.delete("/", users.deleteAll);


  app.use('/api/users', router);
};
