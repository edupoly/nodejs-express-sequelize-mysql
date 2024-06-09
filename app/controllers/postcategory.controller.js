const db = require("../models");
const PostCategory = db.postcategories;
const Op = db.Sequelize.Op;

// Create and Save a new PostCategory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a PostCategory
  const postCategory = {
    title: req.body.title,
    image: req.body.image,
    pageid:req.body.pageid
  };

  // Save PostCategory in the database
  PostCategory.create(postCategory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the postCategory."
      });
    });
};

// Retrieve all PostCategories from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  PostCategory.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving postCategory."
      });
    });
};

// Find a single PostCategory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PostCategory.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PostCategory with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving PostCategory with id=" + id
      });
    });
};

// Update a PostCategory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PostCategory.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PostCategory was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update PostCategory with id=${id}. Maybe PostCategory was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating PostCategory with id=" + id
      });
    });
};

// Delete a PostCategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PostCategory.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PostCategory was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete PostCategory with id=${id}. Maybe PostCategory was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete PostCategory with id=" + id
      });
    });
};

// Delete all PostCategory from the database.
exports.deleteAll = (req, res) => {
  PostCategory.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were PostCategory successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all PostCategories."
      });
    });
};
