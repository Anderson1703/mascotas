require("dotenv").config();
require("./Database/connect/index");
const express = require("express");
const cors = require("cors");
const errorController = require("./Midlewares/errorManager/index");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", require("./Rutes/principal/index"));
app.use("/mascotas", require("./Rutes/mascotas/index"));
app.use("/users", require("./Rutes/users/index"));
app.use("/users/login", require("./Rutes/login/index"));
app.use(errorController);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
  );
}

module.exports = app;
