const { Game, Favorite } = require('../models')

const getFavorite = async (req, res) => {
  try {
    const favList = await Favorite.findAll()
    res.send(favList)
  } catch (error) {
    throw error
  }
}

const getGamesFromFavorite = async (req, res) => {
  let favoriteId = parseInt(req.params.favorite_id)
  const gameList = await Favorite.findAll({
    where: { id: favoriteId },
    include: { model: Game, as: 'games', though: { attributes: [] } }
  })
  res.send(gameList)
}

module.exports = {
  getFavorite,
  getGamesFromFavorite
}
