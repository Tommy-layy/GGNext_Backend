const Router = require('express').Router()
const Router = require('../controllers/GameController')

Router.get('/', controller.addGame)
Router.delete('/:game_id', controller.deleteGame)
