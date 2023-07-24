const express = require("express");
// const bodyParser = require("body-parser")
const cors = require("cors");

const app = express();

const db = require("./models");
// db.sequelize.sync()
(async () => {
  try {
    await db.sequelize.sync();
    console.log("Database berhasil di-synchronize.");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
})();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.")
// })

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to myweb" });
});

require("./routes/user.route.js")(app);
require("./routes/auth.route.js")(app);
require("./routes/project.route.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
