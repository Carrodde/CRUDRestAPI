const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const migrationhelper = require("./migrationhelper");
const { sequelize, player } = require("./models");

const playerController = require("./controllers/playerController");
const { playerValidator } = require("./validators/playerValidator");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

app.get("/getAll", playerController.retrievePlayers);

app.post("/addNew", playerValidator, playerController.addPlayer);

app.post("/updatePlayer/:id", playerValidator, playerController.updatePlayer);

app.delete("/deletePlayer/:id", playerController.deletePlayer);

app.listen(port, async () => {
  await migrationhelper.migrate();
  await sequelize.authenticate();
  console.log(`Example app listening2 on port ${port}`);
});
