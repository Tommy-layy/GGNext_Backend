const Router = require('express').Router()
const controller = require('../controllers/FavoriteController')

Router.get('/', controller.getFavorite)
Router.get('/:user_id', controller.getFavoriteByUser)
Router.get('/games/:favorite_id', controller.getGamesFromFavorite)
Router.post('/addgame/:favorite_id/:game_id', controller.addGamesToFavorite)
