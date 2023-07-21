const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
var hash = require("object-hash");

// create
exports.create = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
      code: 400,
      data: null,
    });
  }

  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  User.create(user)
    .then((data) => {
      res.status(200).send({
        message: "Add user Successfully",
        code: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the user.",
        code: 500,
        data: null,
      });
    });
};

//findall
exports.findAll = (req, res) => {
  const username = req.query.username;
  let condition = username
    ? { username: { [Op.iLike]: `%${username}%` } }
    : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.status(200).send({
        message: "get all users Successfully",
        code: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
        code: 500,
        data: null,
      });
    });
};

// findone
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.status(200).send({
        message: "get one user Successfully",
        code: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
        code: 500,
        data: null,
      });
    });
};

// update
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "User was updated successfully",
          code: 200,
          data: null,
        });
      } else {
        res.status(204).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
          code: 204,
          data: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
        code: 500,
        data: null,
      });
    });
};

// delete
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "user was deleted successfully!",
          code: 200,
          data: null,
        });
      } else {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
          code: 404,
          data: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
        code: 500,
        data: null,
      });
    });
};

// delete all
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })

    .then((num) => {
      res.status(200).send({
        message: `${nums} user were deleted successfully!`,
        code: 200,
        data: null,
      });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all user.",
        code: 500,
        data: null,
      });
    });
};
