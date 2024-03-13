const { player } = require("../models");
const { Op } = require("sequelize");

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
async function retrievePlayers(req, res) {
  let sortBy = req.query.sortBy || "name";
  let sortOrder = req.query.sortOrder || "asc";
  const q = req.query.q || "";
  const players = await player.findAll({
    order: [[sortBy, sortOrder]],
  });

  const result = players.map((p) => {
    return {
      name: p.name,
      jersey: p.jersey,
      position: p.position,
    };
  });
  return res.json(result);
}

//Function for deleting players
async function deletePlayer(req, res) {
  const playerId = req.params.id;
  try {
    const playerDelete = await player.findOne({
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

//Function for updating playerinfo
async function updatePlayer(req, res) {
  const playerId = req.params.id;
  const existingPlayer = await player.findOne({
    where: { id: playerId },
  });

  if (!existingPlayer) {
    res.status(404).send("Player does not exist");
  }

  const updatedPlayer = {
    name: req.body.name,
    jersey: req.body.jersey,
    position: req.body.position,
  };

  try {
    await existingPlayer.update(updatedPlayer);
    res.status(201).send("Player has been updated");
  } catch (err) {
    res.status(500).send("Server Error: Failed to update player");
  }
}

module.exports = {
  addPlayer,
  retrievePlayers,
  deletePlayer,
  updatePlayer,
};
