const { verifyToken } = require("../middleware/auth");

module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  let router = require("express").Router();

  // create
  router.post("/", user.create);

  // findAll
  router.get("/", user.findAll);

  // findone
  router.get("/:id", user.findOne);

  // update
  router.put("/:id", user.update);

  // delete by id
  router.delete("/:id", user.delete);

  // delete all
  router.delete("/", user.deleteAll);

  app.use("/users", router);
};
