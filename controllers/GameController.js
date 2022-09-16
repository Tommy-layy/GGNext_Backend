const { Game } = require('../models')

const addGame = async (req, res) => {
  try {
    let create = await Game.create(req.body)
    res.send(create)
  } catch (error) {
    throw error
  }
}

const deleteGame = async (req, res) => {
  try {
    let gameId = parseInt(req.params.game_id)
    await Game.destroy({ where: { id: gameId } })
    res.send({ message: 'Game removed from favorites!' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  addGame,
  deleteGame
}
