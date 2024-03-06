const { player } = require("../models");

async function addPlayer(req, res) {
  const { name, jersey, position } = req.body;
  const existingPlayer = await player.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (existingPlayer) {
    return res.status(401).send("Player already exist");
  } else {
    await player.create({
      name: name,
      jersey: jersey,
      position: position,
    });
  }
  return res.status(201).send("Player added!");
}

module.exports = {
  addPlayer,
};
