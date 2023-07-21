const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user_payload = {
    username: req.body.username,
    password: req.body.password,
  };

  User.findOne({
    where: {
      username: user_payload.username,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: "Failed to login!",
          code: 404,
          data: null,
        });
      }
      const isPasswordValid = bcrypt.compareSync(
        user_payload.password,
        user.password
      );
      if (!isPasswordValid) {
        res.status(401).send({
          message: "Failed to login!",
          code: 401,
          data: null,
        });
      }

      const token = jwt.sign(
        {
          username: user.username,
        },
        "supersecretkey",
        {
          expiresIn: 86400,
        }
      );

      res.status(200).send({
        message: "Success Login!",
        code: 200,
        data: token,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the user.",
      });
    });
};
