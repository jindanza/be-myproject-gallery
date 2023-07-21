const express = require("express");
// const bodyParser = require("body-parser")
const cors = require("cors");

const app = express();

const db = require("./models");
// db.sequelize.sync()

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.")
// })

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to myweb" });
});

require("./routes/user.route.js")(app);
require("./routes/auth.route.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
