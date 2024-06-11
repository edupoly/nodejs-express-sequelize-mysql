const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const express = require("express");
const cors = require("cors");
var jwt = require('jsonwebtoken');
const app = express();
app.set('view engine', 'pug')

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  // Save User in the User
  User.create(user)
    .then(data => {
      res.send({"msg":"registrationsuccess"});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};

// Find a single User with an username
exports.findOne = (req, res) => {
  const username = req.params.username;

  User.findOne(username)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Page with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Username with username=" + username
      });
    });
};

//login controller
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findAll({
    where:{
      username,
      password
    }
  })
    .then(data => {
      if (data) {
        if(data.length===0){
          res.redirect("/loginWithWrongCredentials.html")
        }
        else{

          var token = jwt.sign({username:data[0].username,password:data[0].password}, 'edosecretkey');
          console.log(token)
          
          res.header('token',token)
          res.json({msg:"loginsuccess",token})

        }

      } else {
        res.status(404).send({
          message: `Cannot find User with username=${username}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Username with username=" + username
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} User were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User."
      });
    });
};

