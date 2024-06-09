module.exports = app => {
  const pages = require("../controllers/page.controller.js");

  var router = require("express").Router();

  // Create a new Page
  router.post("/", pages.create);

  // Retrieve all Pages
  router.get("/", pages.findAll);

  // Retrieve a single Page with id
  router.get("/:id", pages.findOne);

  // Update a Page with id
  router.put("/:id", pages.update);

  // Delete a Pages with id
  router.delete("/:id", pages.delete);

  // Delete all Pages
  router.delete("/", pages.deleteAll);

  app.use('/api/pages', router);
};
