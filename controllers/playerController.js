const { player } = require("../models");

//Function to add a new player
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

//Function for retrieving all Players
async function retrievePlayers(res) {
  const players = await player.findAll();
  let result = players.map((player) => ({
    name: player.name,
    jersey: player.jersey,
    position: player.position,
  }));
  res.json(result);
}

//Function for deleting players
async function deletePlayer(req, res) {
  const playerId = req.params.id;
  try {
    const playerDelete = await players.findOne({
      where: { id: playerId },
    });
    if (!playerDelete) {
      return res.status(404).send("Player does not exist");
    }
    await playerDelete.destroy();
    res.status(201).send("Player deleted");
  } catch (err) {
    res.status(500).send("Server error: deleting user");
  }
}

module.exports = {
  addPlayer,
  retrievePlayers,
  deletePlayer,
};
