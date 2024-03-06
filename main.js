const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const migrationhelper = require("./migrationhelper");
const { sequelize, player } = require("./models");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

app.listen(port, async () => {
  await migrationhelper.migrate();
  await sequelize.authenticate();
  console.log(`Example app listening2 on port ${port}`);
});
