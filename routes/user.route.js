const { verifyToken } = require("../middleware/auth");

module.exports = (app) => {
  const user = require("../controllers/user.controller");

  let router = require("express").Router();

  // create
  router.post("/", user.create);

  // findAll
  router.get("/", verifyToken, user.findAll);

  // findone
  router.get("/:id", verifyToken, user.findOne);

  // update
  router.put("/:id", verifyToken, user.update);

  // delete by id
  router.delete("/:id", verifyToken, user.delete);

  // delete all
  router.delete("/", verifyToken, user.deleteAll);

  app.use("/api/users", router);
};
