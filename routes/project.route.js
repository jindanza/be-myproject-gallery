const { verifyToken } = require("../middleware/auth");

module.exports = (app) => {
  const project = require("../controllers/project.controller");

  let router = require("express").Router();

  // create
  router.post("/", project.create);

  // findAll
  router.get("/", project.findAll);

  // findone
  router.get("/:id", project.findOne);

  // update
  router.put("/:id", project.update);

  // delete by id
  router.delete("/:id", project.delete);

  // delete all
  router.delete("/", project.deleteAll);

  app.use("/api/projects", router);
};
