const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const migrationhelper = require("./migrationhelper");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

app.listen(port, async () => {
  await migrationhelper.migrate();
  console.log(`Example app listening2 on port ${port}`);
});
