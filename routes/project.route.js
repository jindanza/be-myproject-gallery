const { verifyToken } = require("../middleware/auth");

module.exports = (app) => {
  const project = require("../controllers/project.controller");

  let router = require("express").Router();

  // create
  router.post("/", verifyToken, project.create);

  // findAll
  router.get("/", verifyToken, project.findAll);

  // findone
  router.get("/:id", verifyToken, project.findOne);

  // update
  router.put("/:id", verifyToken, project.update);

  // delete by id
  router.delete("/:id", verifyToken, project.delete);

  // delete all
  router.delete("/", verifyToken, project.deleteAll);

  app.use("/api/projects", router);
};
