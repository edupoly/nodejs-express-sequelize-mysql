module.exports = app => {
  const posts = require("../controllers/post.controller.js");

  var router = require("express").Router();

  // Create a new Post
  router.post("/", posts.create);

  // Retrieve all Posts
  router.get("/", posts.findAll);

  // Retrieve a single Post with id
  router.get("/:id", posts.findOne);

  // Update a Posts with id
  router.put("/:id", posts.update);

  // Delete a Posts with id
  router.delete("/:id", posts.delete);

  // Delete all Posts
  router.delete("/", posts.deleteAll);

  app.use('/api/posts', router);
};
