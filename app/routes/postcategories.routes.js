module.exports = app => {
  const postcategories = require("../controllers/postcategory.controller.js");

  var router = require("express").Router();

  // Create a new PostCategory
  router.post("/", postcategories.create);

  // Retrieve all PostCategorys
  router.get("/", postcategories.findAll);

  // Retrieve a single PostCategory with id
  router.get("/:id", postcategories.findOne);

  // Update a PostCategory with id
  router.put("/:id", postcategories.update);

  // Delete a PostCategory with id
  router.delete("/:id", postcategories.delete);

  // Delete all PostCategories
  router.delete("/", postcategories.deleteAll);

  app.use('/api/postcategories', router);
};
